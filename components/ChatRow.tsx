import { db } from "@/firebase";

import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BsChatLeft } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
interface Props {
  id: string;
}
function ChatRow({ id }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );
  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [pathName]);
  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && " bg-gray-700/50"}`}
    >
      <BsChatLeft className=" h-5 w-5 " />
      <p
        className=" flex-1 hidden truncate
                    md:inline-flex"
      >
        {/* 把最後一段對話拉出來 */}
        {messages?.docs[messages?.docs.length - 1]?.data().text || "chat"}
      </p>
      <FiTrash2
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 
                hover:text-red-700"
      />
    </Link>
  );
}

export default ChatRow;
