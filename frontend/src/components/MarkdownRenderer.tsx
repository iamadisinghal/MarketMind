"use client";

import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
}