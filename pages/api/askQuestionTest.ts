// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, ChatId } = req.body;
  if (ChatId) {
    res.status(200).json({ answer: ChatId });
  }
  res.status(200).json({ answer: "John Doe" });
}
