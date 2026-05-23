import { Message, ChatResponse, Conversation } from "@/types/chat";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function sendMessage(
  messages: Message[]
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        messages,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response");
  }

  return response.json();
}

export async function streamMessage(
    messages: Message[],
    conversationId: number | null,
    onToken: (token: string) => void
) {
    const response = await fetch(
        `${API_BASE_URL}/chat/stream`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages,
                conversation_id: conversationId,
            }),
        }
    );

    if (!response.body) {
        throw new Error("No response body");
    }

    const newConversationId = Number(
        response.headers.get("X-Conversation-Id")
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while(true) {
        const {done, value} = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        onToken(chunk);
    }

    return newConversationId;
}

export async function getConversations():
    Promise<Conversation[]> {
    
    const response = await fetch(
        `${API_BASE_URL}/conversations`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch conversations"
        );
    }

    return response.json();
}

export async function getConversationMessages(
    conversationId: number
): Promise<{ messages: Message[] }> {

    const response = await fetch(
        `${API_BASE_URL}/conversations/${conversationId}`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch messages"
        );
    }

    return response.json();
}

export async function deleteConversation(
    conversationId: number
) {
    const response = await fetch(
        `${API_BASE_URL}/conversations/${conversationId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to delete conversation"
        );
    }

    return response.json();
}