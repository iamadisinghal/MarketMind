from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.api.health import router as health_router

from app.db.database import engine, Base

from app.core.config import settings

app = FastAPI(title = settings.APP_NAME)

Base.metadata.create_all(bind=engine)

app.include_router(chat_router)
app.include_router(health_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message" : f"{settings.APP_NAME} backend is running."
    }