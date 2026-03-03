"""
Public Portal Embeddings - Ollama-based embeddings using nomic-embed-text
"""
from datetime import datetime
import logging
import math
import os
import openai
import numpy as np
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

# OLLAMA_BASE_URL = "http://localhost:11434"
# EMBEDDING_MODEL = "nomic-embed-text"
# EMBEDDING_DIMENSION = 384
EMBEDDING_MODEL = "text-embedding-3-small"

print("Using OpenAI for embeddings", os.getenv("OPENAI_API_KEY"))

openai.api_key = os.getenv("OPENAI_API_KEY", "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")




def cosine_similarity_optimized(vec1: List[float], vec2: List[float]) -> float:
    """
    Compute cosine similarity between two vectors.
    Optimized version using math operations.
    
    Args:
        vec1: First vector (embedding)
        vec2: Second vector (embedding)
    
    Returns:
        Cosine similarity score (0-1)
    """
    if not vec1 or not vec2 or len(vec1) != len(vec2):
        return 0.0
    
    # Dot product
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    
    # Magnitudes
    mag1 = math.sqrt(sum(a * a for a in vec1))
    mag2 = math.sqrt(sum(b * b for b in vec2))
    
    if mag1 == 0 or mag2 == 0:
        return 0.0
    
    # Cosine similarity
    return dot_product / (mag1 * mag2)

def generate_embedding(text: str) -> List[float]:
    """
    Generate embedding using OpenAI embeddings API.
    """
    try:
        text = text.strip()
        if not text:
            return []

        response = openai.embeddings.create(
            model=EMBEDDING_MODEL,
            input=text[:8000]  # safe limit
        )

        return response.data[0].embedding

    except Exception as e:
        logger.error(f"OpenAI embedding error: {e}")
        return []

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calculate cosine similarity between vectors"""
    try:
        if not vec1 or not vec2 or len(vec1) != len(vec2):
            return 0.0
        
        vec1_np = np.array(vec1, dtype=np.float32)
        vec2_np = np.array(vec2, dtype=np.float32)
        
        dot_product = np.dot(vec1_np, vec2_np)
        norm1 = np.linalg.norm(vec1_np)
        norm2 = np.linalg.norm(vec2_np)
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        return float(dot_product / (norm1 * norm2))
    
    except Exception as e:
        logger.error(f"Similarity error: {e}")
        return 0.0


def batch_cosine_similarity(
    query_embedding: List[float],
    embeddings: List[List[float]]
) -> List[float]:
    """Calculate similarity between one query and many embeddings"""
    try:
        query_np = np.array(query_embedding, dtype=np.float32)
        embeddings_np = np.array(embeddings, dtype=np.float32)
        
        similarities = np.dot(embeddings_np, query_np)
        return similarities.clip(0, 1).tolist()
    
    except Exception as e:
        logger.error(f"Batch similarity error: {e}")
        return [0.0] * len(embeddings)

async def generate_conversation_embedding(conversation_text: str, 
                                         config: ConversationConfig) -> Dict[str, Any]:
    """Generate comprehensive embedding for entire conversation"""
    model = config.embedding_config.get("model", "nomic-embed-text")
    
    # Create a summary for embedding
    summary_prompt = f"""Summarize this conversation in 1-2 sentences for semantic search:

{conversation_text[:2000]}

Summary:"""
    
    try:
        # Get conversation summary
        summary = await call_ollama_llm(summary_prompt, temperature=0.3, max_tokens=100)
        embedding = generate_embedding(summary)  # Use existing function
        
        return {
            "embedding": embedding,
            "summary": summary,
            "dimension": len(embedding),
            "generated_at": datetime.utcnow()
        }
    except Exception as e:
        logger.warning(f"⚠️ Conversation embedding failed: {e}")
        return {"embedding": [], "summary": "", "dimension": 0}