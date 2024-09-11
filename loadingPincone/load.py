from dotenv import load_dotenv
load_dotenv()
import os
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
import json

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
if "rmp-ai" not in pc.list_indexes().names():
    pc.create_index(
        name="rmp-ai", 
        dimension=1536, 
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1",
        )
    )

BATCH_SIZE = 100 

data = json.load(open("Stetson.json"))
print(len(data))


processed_data = []
client = OpenAI()

for professor in data:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=professor['name']
    )

    embedding = response.data[0].embedding
    processed_data.append({
        'values': embedding,
        'id': professor['name'],
        "metadata": {
            'department': professor['department'],
            'school': professor['institution name'],
            'overall_rating': professor['overall rating'],
            'number_of_ratings': professor['number of ratings'],
            }
        }
    )
    
index = pc.Index("rmp-ai")
print(processed_data[0:10])
for i in range(0, len(processed_data), BATCH_SIZE):
    batch = processed_data[i:i+BATCH_SIZE]
    index.upsert(vectors=batch)
    print(f"Upserted batch {i//BATCH_SIZE + 1}")


print(index.describe_index_stats(namespace="stetson"))