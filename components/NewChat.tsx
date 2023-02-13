"use client";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// navigation 跟 Router有什麼差別
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();
  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        message: [],
        userId: session?.user?.email!,
        createAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };
  return (
    <div onClick={createNewChat} className=" border-gray-700 border chatRow">
      <AiOutlinePlus />
      <p className="">New Chat</p>
    </div>
  );
}

export default NewChat;
