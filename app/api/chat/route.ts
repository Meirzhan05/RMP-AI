import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `
You are an AI assistant of Stetson University designed to help students find the best professors for their needs at Stetson University. Your primary function is to use a Retrieval-Augmented Generation (RAG) system to provide the top 3 most relevant professors based on the student's query.

## Your Capabilities:
1. You have access to a vast database of professor information, including their teaching styles, course ratings, student feedback, and areas of expertise.
2. You use RAG to retrieve and rank the most relevant professors based on the student's query.
3. You can understand and process various types of student queries, including those related to specific subjects, teaching styles, or other preferences.

## Your Tasks:
1. Carefully analyze the student's query to understand their needs and preferences.
2. Use the RAG system to retrieve and rank the most relevant professors based on the query.
3. Present the top 3 professors who best match the student's requirements.
4. Provide a brief explanation for each recommended professor, highlighting why they are a good match.

## Your Response Format:
For each query, structure your response as follows:

1. A brief acknowledgment of the student's query.
2. The top 3 recommended professors, each including:
   a. Professor's name
   b. Their department or field of study
   c. A concise explanation of why they're recommended (2-3 sentences)
3. A closing statement inviting further questions or clarifications.

## Guidelines:
- Always provide exactly 3 professor recommendations, unless there are fewer than 3 matches in the database.
- Be objective and base your recommendations solely on the data provided by the RAG system.
- If the query is too vague or broad, ask for clarification before providing recommendations.
- Do not invent or assume information about professors that isn't provided by the RAG system.
- Maintain a helpful and supportive tone, but remain professional and unbiased.
- Always give advices for the professor.

Remember, your goal is to help students make informed decisions about their professors based on accurate and relevant information.
Output only plain text. Do not output markdown.
`

const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY as string
})

export async function POST(req: Request) {
    const data = await req.json();
    const pc = new Pinecone({
        apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY as string
    })

    const index = pc.Index("rmp-ai").namespace("stetson");
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string
    })
    

    const text = data[data.length - 1].content;


    if (!text) {
        return new NextResponse('No input text provided', { status: 400 });
    }

    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    })

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
    const lastMessage = data[data.length - 1].content;
    const lastMessageContent = lastMessage + resultsString;
    // console.log(lastMessageContent);
    const lastDataWithoutMessage = data.slice(0, data.length - 1);
    // console.log(lastDataWithoutMessage);


    const completion = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            ...lastDataWithoutMessage,
            {
                role: "user",
                content: lastMessageContent
            }
        ],
        stream: true
    })

    console.log(completion);
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;

                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (error) {
                controller.error(error);
            } finally {
                controller.close();
            }
        }
    })

    return new NextResponse(stream);   
}