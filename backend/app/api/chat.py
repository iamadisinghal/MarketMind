from fastapi import APIRouter

from app.models.chat import ChatRequest
from app.graph.chat_graph import chat_graph

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest):
    result = chat_graph.invoke({
        "message": request.message
    })

    return {
        "response": result["response"]
    }