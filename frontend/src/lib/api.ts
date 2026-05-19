import { Message, ChatResponse } from "@/types/chat";

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