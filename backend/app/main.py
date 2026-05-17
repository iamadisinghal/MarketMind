from fastapi import FastAPI

from app.api.chat import router as chat_router
from app.api.health import router as health_router

from app.core.config import settings

app = FastAPI(title = settings.APP_NAME)

app.include_router(chat_router)
app.include_router(health_router)

@app.get("/")
def root():
    return {
        "message" : f"{settings.APP_NAME} backend is running."
    }