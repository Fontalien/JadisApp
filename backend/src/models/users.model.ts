import { Message } from "./messages.models";

export interface Users {
  id: number;
  username: string;
  password: string;
  email: string | null;
  role: "admin" | "user";
  createdAt: Date;
  messages: Message[];
}