"use client";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiPaperAirplane } from "react-icons/hi";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
interface Props {
  chatId: string;
}

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  // useSWR to get model
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  // const model = "text-advinci-003";

  const senMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );
    //   Toast notification to say loading
    const notification = toast.loading("ChatGPT is thinking ...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notification to say successful
      toast.success("ChatGPT has responded", {
        id: notification,
      });
    });

    // await fetch("/api/askQuestion", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: input,
    //     chatId,
    //     model,
    //     session,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };
  return (
    <div className="bg-gray-700 text-gray-400 rounded-lg text-sm">
      <form onSubmit={senMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent flex-1 
                    focus:outline-none 
                    disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Text your message here ..."
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] text-white font-bold px-4 py-2 rounded
                     hover:opacity-50
                    disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <HiPaperAirplane className="rotate-45 h-4 w-4" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
