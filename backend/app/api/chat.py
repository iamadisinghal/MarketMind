from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from langchain_core.messages import HumanMessage, AIMessage

import json

from app.services.llm import llm
from app.models.chat import ChatRequest
from app.graph.chat_graph import chat_graph
from app.db.session import get_db
from app.services.chat_service import create_conversation, save_message
from app.db.models import Conversation

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
async def chat_stream(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    conversation_id = request.conversation_id

    latest_user_message = request.messages[-1]

    if conversation_id is None:
        title = (
            latest_user_message.content[:40]
        )

        conversation = create_conversation(
            db,
            title=title,
        )

        conversation_id = conversation.id

    save_message(
        db=db,
        conversation_id=conversation_id,
        role="user",
        content=latest_user_message.content,
    )
        
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

        full_response = ""

        for chunk in stream:
            if chunk.content:
                full_response += chunk.content
                yield chunk.content

        save_message(
            db=db,
            conversation_id=conversation_id,
            role="assistant",
            content=full_response,
        )

    return StreamingResponse(
        generate(),
        media_type = "text/plain",
        headers={
            "X-Conversation-Id": str(conversation_id)
        },
    )

@router.get("/conversations")
def get_conversations(
    db: Session = Depends(get_db)
):
    
    conversations = (
        db.query(Conversation)
        .order_by(Conversation.id.desc())
        .all()
    )

    return [
        {
            "id": conversation.id,
            "title": conversation.title,
            "created_at": 
                conversation.created_at.isoformat(),
            "preview": (
                conversation.messages[-1].content[:60]
                if conversation.messages
                else ""
            )
        }
        for conversation in conversations
    ]

@router.get("/conversations/{conversation_id}")
def get_conversation_messages(
    conversation_id: int, 
    db: Session = Depends(get_db),
):
    
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if not conversation:
        return {
            "messages": []
        }
    
    return {
        "messages": [
            {
                "role": message.role,
                "content": message.content,
            }
            for message in conversation.messages
        ]
    }

@router.delete(
    "/conversations/{conversation_id}"
)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if not conversation:
        return {
            "success": False
        }
    
    db.delete(conversation)
    db.commit()

    return {
        "success": True
    }