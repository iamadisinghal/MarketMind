from typing import Literal, List, Optional

from pydantic import BaseModel

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages:List[Message]

    conversation_id: Optional[int] = None