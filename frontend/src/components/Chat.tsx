"use client";

import { useState } from "react";

import { sendMessage } from "@/lib/api";

import { Message } from "@/types/chat";

import MessageBubble from "./MessageBubble";

export default function Chat() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    try {
      setLoading(true);

      const result = await sendMessage({
        message: currentInput,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl h-[90vh] flex flex-col">
      <h1 className="text-4xl font-bold mb-6">
        MarketMind
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
          />
        ))}

        {loading && (
          <div className="text-zinc-400">
            Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <textarea
          className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-700 resize-none"
          rows={3}
          placeholder="Ask MarketMind something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-4 bg-white text-black rounded-xl font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}