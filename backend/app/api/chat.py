from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from langchain_core.messages import HumanMessage, AIMessage

import json

from app.services.llm import llm
from app.models.chat import ChatRequest
from app.graph.chat_graph import chat_graph

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):

    result = chat_graph.invoke({
        "messages": request.messages
    })

    return {
        "response": result["response"]
    }

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
        
    async def generate():
        messages = []

        for message in request.messages:
            role = getattr(message, "role", None)
            content = getattr(message, "content", None)

            if role == "user":
                messages.append(HumanMessage(content=content))

            else:
                messages.append(AIMessage(content=content))

        stream = llm.stream(messages)

        for chunk in stream:
            print("STREAM CHUNK:", chunk)
            if chunk.content:
                yield chunk.content

    return StreamingResponse(
        generate(),
        media_type = "application/x-ndjson",
    )