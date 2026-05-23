from sqlalchemy.orm import Session

from app.db.models import Conversation, Message

def create_conversation(
        db: Session,
        title: str | None = None,
):
    conversation = Conversation(title = title)

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation

def save_message(
    db: Session,
    conversation_id: int,
    role: str,
    content: str,
):
    message = Message(
        role=role,
        content=content,
        conversation_id=conversation_id,
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message