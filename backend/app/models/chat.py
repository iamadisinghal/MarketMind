from typing import Literal, List

from pydantic import BaseModel

class Message(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages:List[Message]