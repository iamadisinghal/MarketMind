from typing import TypedDict
from app.services.llm import llm
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage

class ChatState(TypedDict):
    messages:str
    response:str

def chatbot_node(state: ChatState):
    chat_history = []

    for message in state['messages']:
        role = getattr(message, "role", None)
        content = getattr(message, "content", None)

        if role is None:
            role = message["role"]

        if content is None:
            content = message["content"]

        if role == "user":
            chat_history.append(
                HumanMessage(content=content)
            )
        else:
            chat_history.append(
                AIMessage(content=content)
            )

    response = llm.invoke(chat_history)

    return {
        "response": response.content
    }

graph_builder = StateGraph(ChatState)

graph_builder.add_node("chatbot", chatbot_node)

graph_builder.set_entry_point("chatbot")

graph_builder.add_edge("chatbot", END)

chat_graph = graph_builder.compile()