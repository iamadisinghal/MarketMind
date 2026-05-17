"use client";

import { useState } from "react";

import { sendMessage } from "@/lib/api";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const result = await sendMessage({
        message,
      });

      setResponse(result.response);
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl space-y-4">
      <h1 className="text-4xl font-bold">
        MarketMind
      </h1>

      <textarea
        className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-700"
        rows={4}
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-3 bg-white text-black rounded-lg font-semibold"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-700 min-h-[200px] whitespace-pre-wrap">
        {response}
      </div>
    </div>
  );
}