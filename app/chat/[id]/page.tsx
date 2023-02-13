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
      <Chat ChatId={id} />
      <ChatInput ChatId={id} />
    </div>
  );
}

export default chatPage;
