from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)

    messages = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
    )

    created_at = Column(
        DateTime, 
        default=datetime.utcnow,
    )

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, nullable=False)
    content = Column(String, nullable=False)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))

    conversation = relationship(
        "Conversation",
        back_populates="messages",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )