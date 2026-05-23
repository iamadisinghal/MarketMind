export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

export interface Message {
    role: "user" | "assistant";
    content: string;
}

export interface Conversation {
    id: number;
    title: string | null;
    created_at: string;
    preview: string;
}