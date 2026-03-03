from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    MONGO_URI: str
    MONGO_DB: str
    JWT_SECRET: str
    JWT_EXPIRE_MINUTES: int = 60
    OPENROUTER_API_KEY: str
    OPENROUTER_URL: str
    LLM_MODEL: str

    SMTP_EMAIL: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None

    OPENAI_API_KEY: str  # ✅ ADD THIS

    class Config:
        env_file = ".env"
        extra = "ignore"  # Optional safety

def get_settings():
    return Settings()