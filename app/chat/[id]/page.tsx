import Chat from "@/components/Chat";
import React from "react";
import ChatInput from "@/components/ChatInput";
interface Props {
  params: {
    id: string;
  };
}
function chatPage({ params: { id } }: Props) {
  return (
    <div className=" flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default chatPage;
