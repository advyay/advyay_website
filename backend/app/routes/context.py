from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from datetime import datetime
from typing import List
from app.core.database import get_database
from app.core.config import get_settings
from openai import OpenAI
import uuid
import re

settings = get_settings()
router = APIRouter()
client = OpenAI(api_key=settings.OPENAI_API_KEY)

EMBED_MODEL = "text-embedding-3-small"  # 1536 dims

# ---------------------------
# TEXT CHUNKING
# ---------------------------

def split_into_sentences(text: str) -> List[str]:
    sentences = re.split(r'(?<=[.!?])\s+', text)
    return [s.strip() for s in sentences if len(s.strip()) > 20]

def chunk_text(text: str, max_chars: int = 800) -> List[str]:
    sentences = split_into_sentences(text)
    chunks = []
    current = ""

    for sentence in sentences:
        if len(current) + len(sentence) <= max_chars:
            current += " " + sentence
        else:
            if len(current.strip()) > 80:
                chunks.append(current.strip())
            current = sentence

    if len(current.strip()) > 80:
        chunks.append(current.strip())

    return chunks


# ---------------------------
# EMBEDDING
# ---------------------------

async def generate_embedding(text: str):
    response = client.embeddings.create(
        model=EMBED_MODEL,
        input=text
    )
    return response.data[0].embedding


@router.get("/context")
async def list_context():
    db = await get_database()

    docs = await db.context_chunks.aggregate([
        {
            "$group": {
                "_id": "$document_id",
                "total_chunks": {"$sum": 1}
            }
        }
    ]).to_list(100)

    return [
        {
            "document_id": doc["_id"],
            "total_chunks": doc["total_chunks"]
        }
        for doc in docs
    ]

# ---------------------------
# UPLOAD TEXT FILE
# ---------------------------

@router.post("/context/upload")
async def upload_context(file: UploadFile = File(...)):
    db = await get_database()

    content = await file.read()
    text = content.decode("utf-8", errors="ignore")

    if len(text.strip()) < 100:
        raise HTTPException(status_code=400, detail="Text too short")

    chunks = chunk_text(text)

    document_id = str(uuid.uuid4())

    for index, chunk in enumerate(chunks):
        embedding = await generate_embedding(chunk)

        await db.context_chunks.insert_one({
            "document_id": document_id,
            "chunk_index": index,
            "content": chunk,
            "embedding": embedding,
            "created_at": datetime.utcnow()
        })

    return {
        "success": True,
        "document_id": document_id,
        "chunks_created": len(chunks)
    }


# ---------------------------
# VECTOR SEARCH
# ---------------------------
# ----------------------------------------
# INTERNAL VECTOR SEARCH (FOR CHAT USE)
# ----------------------------------------

async def vector_search(query: str, db, top_k: int = 5):

    query_embedding = await generate_embedding(query)

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": query_embedding,
                "numCandidates": 100,
                "limit": top_k
            }
        },
        {
            "$project": {
                "content": 1,
                "score": {"$meta": "vectorSearchScore"}
            }
        }
    ]

    results = await db.context_chunks.aggregate(pipeline).to_list(top_k)

    return results


@router.post("/context/search")
async def search_context(query: str = Query(...), top_k: int = 5):
    db = await get_database()

    query_embedding = await generate_embedding(query)

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": query_embedding,
                "numCandidates": 100,
                "limit": top_k
            }
        },
        {
            "$project": {
                "content": 1,
                "score": {"$meta": "vectorSearchScore"}
            }
        }
    ]

    results = await db.context_chunks.aggregate(pipeline).to_list(top_k)

    return {
        "query": query,
        "results": results
    }