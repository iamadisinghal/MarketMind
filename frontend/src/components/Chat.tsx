"use client";

import { useEffect, useRef, useState } from "react";

import { 
    streamMessage, 
    getConversations, 
    getConversationMessages,
    deleteConversation,
} from "@/lib/api";

import { Message, Conversation } from "@/types/chat";

import MessageBubble from "./MessageBubble";

export default function Chat() {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [conversationId, setConversationId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function refreshConversations() {
    try {
        const data = await getConversations();

        setConversations(data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  useEffect(() => {
    refreshConversations();
  }, []);

  useEffect(() => {
    async function restoreConversation() {
        const storedId = localStorage.getItem(
                            "activeConversationId"
                        );
        if (!storedId) return;

        const conversationId = Number(storedId);

        await loadConversation(conversationId);
    }

    restoreConversation()
  }, [])

  async function loadConversation(
    id: number
  ) {
    try {
        const data = await getConversationMessages(id);

        setMessages(data.messages);

        setConversationId(id);

        localStorage.setItem(
            "activeConversationId",
            String(id)
        )
    } catch (error) {
        console.error(error);
    }
  }

  async function handleDeleteConversation(
    id: number
  ) {
    try {
        await deleteConversation(id);

        if (conversationId === id) {
            setMessages([]);
        
            setConversationId(null);

            localStorage.removeItem(
                "activeConversationId"
            );
        }

        refreshConversations();
    } catch (error) {
        console.error(error);
    }
  }

  async function handleSubmit() {

    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");

    try {

      setLoading(true);

      let streamedResponse = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      const returnedConversationId = 
        await streamMessage(
            [...messages, userMessage],
            conversationId,

            (token) => {

            streamedResponse += token;

            setMessages((prev) => {

                const updated = [...prev];

                updated[updated.length - 1] = {
                role: "assistant",
                content: streamedResponse,
                };

                return updated;
            });
            }
      );

    setConversationId(returnedConversationId);

    localStorage.setItem(
        "activeConversationId",
        String(returnedConversationId)
    );

    refreshConversations();

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
    <div className="h-screen bg-black text-white flex">

        <div className="w-80 border-r border-zinc-800 p-4 flex flex-col">

        <button
            onClick={() => {
            setMessages([]);
            setConversationId(null);

            localStorage.removeItem(
                "activeConversationId"
            )
            }}
            className="mb-4 p-3 rounded-xl bg-white text-black font-semibold"
        >
            New Chat
        </button>

        <div className="space-y-2 overflow-y-auto">

            {conversations.map((conversation) => (

                <div
                    key={conversation.id}
                    className={`group w-full p-3 rounded-xl border transition-colors ${
                    conversation.id === conversationId
                        ? "bg-white text-black border-white"
                        : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800"
                    }`}
                >

                    <div className="flex items-start justify-between gap-2">

                    <button
                        onClick={() =>
                        loadConversation(conversation.id)
                        }
                        className="flex-1 text-left"
                    >

                        <div className="font-semibold truncate">
                        {conversation.title ||
                            `Conversation ${conversation.id}`}
                        </div>

                        <div className="text-sm opacity-70 truncate">
                        {conversation.preview}
                        </div>

                    </button>

                    <button
                        onClick={(e) => {

                        e.stopPropagation();

                        handleDeleteConversation(
                            conversation.id
                        );
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-sm hover:text-red-500"
                    >
                        ✕
                    </button>

                    </div>

                </div>
            ))}

        </div>
        </div>

        <div className="flex-1 p-8 flex flex-col">

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
            <div className="text-zinc-400 animate-pulse">
                MarketMind is thinking...
            </div>
            )}

            <div ref={bottomRef} />
        </div>

        <div className="flex gap-4">

            <textarea
            className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-700 resize-none"
            rows={3}
            placeholder="Ask MarketMind something..."
            value={input}
            onChange={(e) =>
                setInput(e.target.value)
            }
            onKeyDown={(e) => {

                if (
                e.key === "Enter" &&
                !e.shiftKey
                ) {
                e.preventDefault();
                handleSubmit();
                }
            }}
            />

            <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-4 bg-white text-black rounded-xl font-semibold disabled:opacity-50"
            >
            Send
            </button>

        </div>
        </div>
    </div>
    );
}