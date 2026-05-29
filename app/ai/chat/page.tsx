import { Metadata } from "next";
import ChatClient from "@/components/ai/ChatClient";

export const metadata: Metadata = {
  title: "AI Conversation — Alien's Aileen",
  description: "Practice real Korean with AI. Roleplay situations, understand tone, feel the difference.",
};

export default function ChatPage() {
  return <ChatClient />;
}
