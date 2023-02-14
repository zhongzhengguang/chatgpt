"use client";
import React from "react";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session?.user?.email!, "chats")
  );

  return (
    <div className=" p-2 flex flex-col h-screen">
      <div className=" flex-1">
        <div>
          <NewChat />
          <div className=" hidden sm:inline">
            <ModelSelection />
          </div>
          <div className=" flex flex-col space-y-2 my-2">
            {loading && (
              <div className=" animate-pulse text-center text-white">
                <p>Loadind Chats..</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          src={session?.user?.image!}
          alt="/"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}

export default SideBar;
