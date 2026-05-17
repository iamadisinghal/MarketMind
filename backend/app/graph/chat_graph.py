from typing import TypedDict
from langgraph.graph import StateGraph, END
from app.services.llm import llm

class ChatState(TypedDict):
    message:str
    response:str

def chatbot_node(state: ChatState):
    response = llm.invoke(state["message"])

    return {
        "response": response.content
    }

graph_builder = StateGraph(ChatState)

graph_builder.add_node("chatbot", chatbot_node)

graph_builder.set_entry_point("chatbot")

graph_builder.add_edge("chatbot", END)

chat_graph = graph_builder.compile()