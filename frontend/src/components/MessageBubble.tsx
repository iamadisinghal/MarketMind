import { Message } from "@/types/chat";
import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
          isUser
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        <MarkdownRenderer content={message.content} />
      </div>
    </div>
  );
}