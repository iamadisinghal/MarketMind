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