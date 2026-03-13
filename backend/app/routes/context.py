from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from fastapi.responses import PlainTextResponse
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

EMBED_MODEL = "text-embedding-3-small"


def split_into_sentences(text: str) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text)
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
                "total_chunks": {"$sum": 1},
                "created_at": {"$min": "$created_at"}
            }
        },
        {
            "$sort": {"created_at": -1}
        }
    ]).to_list(100)

    return [
        {
            "document_id": doc["_id"],
            "total_chunks": doc["total_chunks"],
            "created_at": doc.get("created_at")
        }
        for doc in docs
    ]


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
                "_id": 0,
                "document_id": 1,
                "chunk_index": 1,
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
    results = await vector_search(query, db, top_k)

    return {
        "query": query,
        "results": results
    }


@router.get("/context/{document_id}")
async def view_document(document_id: str):
    db = await get_database()

    chunks = await db.context_chunks.find(
        {"document_id": document_id},
        {"embedding": 0}
    ).sort("chunk_index", 1).to_list(1000)

    if not chunks:
        raise HTTPException(status_code=404, detail="Document not found")

    cleaned_chunks = []
    for c in chunks:
        cleaned_chunks.append({
            "_id": str(c["_id"]),
            "document_id": c.get("document_id"),
            "chunk_index": c.get("chunk_index"),
            "content": c.get("content"),
            "created_at": c.get("created_at")
        })

    return {
        "document_id": document_id,
        "total_chunks": len(cleaned_chunks),
        "chunks": cleaned_chunks
    }


@router.get("/context/{document_id}/download")
async def download_document(document_id: str):
    db = await get_database()

    chunks = await db.context_chunks.find(
        {"document_id": document_id},
        {"content": 1, "chunk_index": 1, "_id": 0}
    ).sort("chunk_index", 1).to_list(1000)

    if not chunks:
        raise HTTPException(status_code=404, detail="Document not found")

    text = "\n\n".join(chunk["content"] for chunk in chunks)

    return PlainTextResponse(
        text,
        headers={
            "Content-Disposition": f'attachment; filename="{document_id}.txt"'
        }
    )


@router.delete("/context/{document_id}")
async def delete_document(document_id: str):
    db = await get_database()

    result = await db.context_chunks.delete_many({
        "document_id": document_id
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Document not found")

    return {
        "message": "Document deleted",
        "chunks_removed": result.deleted_count
    }