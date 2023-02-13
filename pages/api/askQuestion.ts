import type { NextApiRequest, NextApiResponse } from "next";
import query from "@/lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
interface Data {
  answer: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, ChatId, model, session } = req.body;

  if (!ChatId) {
    res.status(400).json({ answer: "Please provide a valid ChatId !" });
    return;
  }
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt !" });
    return;
  }

  // ChatGPT Query
  const response = await query(prompt, ChatId, model);
  const message: Message = {
    text: response || "ChatGPT was unable to find answer for that!",
    createAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(ChatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
