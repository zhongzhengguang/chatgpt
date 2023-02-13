"use client";
// 這是三小

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}
export function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}
