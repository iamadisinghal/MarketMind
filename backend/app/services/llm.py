from langchain_ollama import ChatOllama

from app.core.config import settings

llm = ChatOllama(
    model=settings.OLLAMA_MODEL,
    temperature=0.7,
)