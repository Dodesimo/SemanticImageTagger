import os
from dotenv import load_dotenv
from fastapi import FastAPI
from PIL import Image
import requests
from langchain_openai import OpenAI, OpenAIEmbeddings
from openai import OpenAI

app = FastAPI()
load_dotenv()

@app.get("/")
def read_root():
    return {"Testing": "Testing"}


@app.get("/upload/{id}")
def upload(id: str):

    client = OpenAI(api_key=os.getenv("KEY"))

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What's in this image? Use cultural knowledge to provide a comprehensive three-sentence paragraph. Use proper nouns pertaining to people, but focus on describing the specific image."},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"https://sitproto.s3.us-east-2.amazonaws.com/{id}"
,
                        },
                    },
                ],
            }
        ],

        max_tokens=300,
    )

    embeddings_model = OpenAIEmbeddings(model="text-embedding-3-large", api_key=os.getenv("KEY"))
    return {"embedding": embeddings_model.embed_query(response.choices[0].message.content)}


