from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import admin, chat, context, analytics

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(chat.router)
app.include_router(context.router)
app.include_router(analytics.router)