import { Book } from "../models/books.model";

export function isBook(data: unknown): data is Book {
  if (
    data &&
    typeof data === "object" &&
    "id" in data &&
    typeof (data as Book).id === "number" &&
    "title" in data &&
    typeof (data as Book).title === "string" &&
    "author" in data &&
    typeof (data as Book).author === "string" &&
    "publishedDate" in data &&
    (data as Book).publishedDate instanceof Date &&
    "genre" in data &&
    typeof (data as Book).genre === "string"
  ) {
    return true;
  }
  return false;
}
