import { Pinecone } from "@pinecone-database/pinecone";
import { Client } from "pg";
// import { NextResponse } from "next/server";
import { Groq } from 'groq-sdk';
import { OpenAI } from "openai";


const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY as string
});



const systemPrompt = `
You are an AI assistant designed to analyze and summarize professor information. When given details about a professor, you will generate a comprehensive overview in JSON format. If there are unknown values, you will assign N/A. Your response should always follow this structure:

{
  "summary": "A concise 3-4 sentence summary of the professor's academic profile, including their name, department, years of experience, primary research areas, and notable achievements.",
  "pros": [
    "A list of 3-5 key strengths or positive aspects of the professor's teaching and research.",
    "Each item should be a simple string, not an object or nested array."
  ],
  "cons": [
    "A list of 2-3 potential areas for improvement or challenges associated with the professor's courses or research supervision.",
    "Each item should be a simple string, not an object or nested array."
  ],
  "recommendation": "A 2-3 sentence recommendation for students considering taking courses with this professor or joining their research group, based on the professor's profile, strengths, and potential challenges."
}

Ensure that all text is properly escaped for JSON formatting. Use single quotes for any quoted text within the JSON strings. Keep the tone professional and objective throughout. Base your analysis solely on the information provided about the professor, without making assumptions or adding speculative details.
`


export async function POST(req: Request) {
    const data = await req.json();
    const id = data.id;
    const pc = new Pinecone({
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string
    });
    let professor;

    const client = new Client({
        host: process.env.NEXT_PUBLIC_DB_HOST,
        port: parseInt(process.env.NEXT_PUBLIC_DB_PORT as string),
        user: process.env.NEXT_PUBLIC_DB_USER,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        database: process.env.NEXT_PUBLIC_DB_NAME
    });

    try {
        await client.connect();
        const query = 'SELECT * FROM professors WHERE id = $1';
        const result = await client.query(query, [id]);
        professor = result.rows[0];
    } catch (error) {
        console.error('Error fetching professor info:', error);
    } finally {
        await client.end();
    }

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string
    })

    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: professor.name
    })

    const index = pc.Index("rmp-ai").namespace("stetson");

    const results = await index.query({
        topK: 1,
        includeMetadata: true,
        vector: embedding.data[0].embedding
    })


    let resultsString = "\n\nReturned results from vector db (done automatically):";
    results.matches.forEach((match) => {
        resultsString += `

        Professor: ${match.id}
        Department: ${match.metadata?.department}
        Overall Rating: ${match.metadata?.overall_rating}
        Institution Name: ${match.metadata?.institution_name}
        Number of Ratings: ${match.metadata?.number_of_ratings}
        Reviews: ${match.metadata?.reviews}
        `;
    })


    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: resultsString
            }
        ],
        response_format: { type: 'json_object' }
    })
    let parsedContent;
    if (completion.choices[0].message.content) {
        try {
            parsedContent = JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return new Response(JSON.stringify({ error: 'Failed to parse response' }), { status: 500 });
        }
    }
    
    return new Response(JSON.stringify(parsedContent));
    
    
}