import { Request, Response, Router } from "express";
import { Book } from "../models/books.model";
import path from "node:path";
import { json } from "node:stream/consumers";
import { parse, serialize } from "../utils/json.utils";
import { isBook } from "../utils/books.utils";
import { isNumberObject, isStringObject } from "node:util/types";
import { Users } from "../models/users.model";
import { UserRole } from "../models/users.model";
import { isAnId } from "../utils/users.utils";
import { isAdmin } from "../services/loans.service";

const jsonBooksPath = path.join(__dirname, "../../data/book.json");
const jsonUsersPath = path.join(__dirname, "../../data/users.json");

export const booksController = Router();

// Sample in-memory book data
const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publishedDate: new Date("1925-04-10"),
    genre: "Fiction",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publishedDate: new Date("1960-07-11"),
    genre: "Fiction",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    publishedDate: new Date("1949-06-08"),
    genre: "Dystopian",
  },
];

// Get all books
booksController.get("/", (req: Request, res: Response) => {
  const listBook = parse(jsonBooksPath, books);
  return res.send(listBook);
});

// Get books by author
booksController.get("/author/:author", (req: Request, res: Response) => {
  const { author } = req.params;
  const filteredBooks = books.filter((book) => book.author === author);
  if (filteredBooks.length === 0) {
    return res.status(404).send("Book not found with the specified author");
  }
  return res.send(filteredBooks);
});

// Get books by genre
booksController.get("/genre/:genre", (req: Request, res: Response) => {
  const { genre } = req.params;
  const filteredBooks = books.filter((book) => book.genre === genre);
  if (filteredBooks.length === 0) {
    return res.status(404).send("No books found with the specified genre");
  }
  return res.send(filteredBooks);
});

// Get books by published year
booksController.get("/publishedYear/:year", (req: Request, res: Response) => {
  const { year } = req.params;
  const filteredBooks = books.filter(
    (book) => book.publishedDate.getFullYear().toString() === year
  );
  if (filteredBooks.length === 0) {
    return res
      .status(404)
      .send("No books found published in the specified year");
  }
  return res.send(filteredBooks);
});

// Get books by title keyword
booksController.get("/title/:keyword", (req: Request, res: Response) => {
  const { keyword } = req.params;
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
  if (filteredBooks.length === 0) {
    return res
      .status(404)
      .send("No books found with the specified title keyword");
  }
  return res.send(filteredBooks);
});

//CREATE a new book
booksController.post("/", (req: Request, res: Response) => {

const users = parse(jsonUsersPath) as Users[];
const queryId = parseInt(req.query.queryId as string);

  if (!isAdmin(queryId)) {
    return res.status(403).send("Forbidden: you are not an admin");
  }

  const body: unknown = req.body;
  const listBooks = parse(jsonBooksPath, books);
  const nextId =
    listBooks.reduce((acc, book) => (book.id > acc ? book.id : acc), 0) + 1;

  const newBook = body as Book;
  newBook.id = nextId;
  newBook.publishedDate = new Date(newBook.publishedDate);

  if (!isBook(newBook)) {
    return res.status(400).send("Invalid book data");
  }

  const existingBook = listBooks.find(
    (book) =>
      book.title.toLowerCase() === newBook.title.toLowerCase() &&
      book.author.toLowerCase() === newBook.author.toLowerCase() &&
      book.genre.toLowerCase() === newBook.genre.toLowerCase()
  );
  if (existingBook) {
    return res.status(409).send("Book already exists");
  }

  const addedBook: Book = {
    id: nextId,
    title: newBook.title,
    author: newBook.author,
    publishedDate: new Date(newBook.publishedDate),
    genre: newBook.genre,
  };

  listBooks.push(addedBook);
  serialize(jsonBooksPath, listBooks);
  return res.json(addedBook);
});

// DELETE a book by ID
booksController.delete("/:id", (req: Request, res: Response) => {

  const queryId = parseInt(req.query.queryId as string);

  if (!isAdmin(queryId)) {
    return res.status(403).send("Forbidden: you are not an admin");
  }

  const { id } = req.params;
  if (id === undefined || isNaN(Number(id))) {
    return res.status(400).send("Invalid ID");
  }

  const listBooks = parse(jsonBooksPath, books);
  const bookIndex = listBooks.findIndex((book) => book.id === Number(id));
  if (bookIndex === -1) {
    return res.status(404).send("Book not found");
  }
  listBooks.splice(bookIndex, 1);
  serialize(jsonBooksPath, listBooks);
  return res.sendStatus(204);
});

// UPDATE a book by ID
booksController.put("/:id", (req: Request, res: Response) => {

const queryId = parseInt(req.query.queryId as string);

  if (!isAdmin(queryId)) {
    return res.status(403).send("Forbidden: you are not an admin");
  }

  const { id } = req.params;
  const body: unknown = req.body;
  const newBook = body as Book;
  newBook.id = Number(id);
  let bookUpdate: Book | undefined;

  if (id === undefined || isNaN(Number(id))) {
    return res.status(400).send("Invalid ID");
  }
  const listBooks = parse(jsonBooksPath, books);
  bookUpdate = listBooks.find((book) => book.id === Number(id));

  if (bookUpdate === undefined) {
    return res.status(404).send("Book not found");
  }

  if (newBook.title !== undefined && typeof newBook.title === "string") {
    bookUpdate.title = newBook.title;
  }

  if (newBook.author !== undefined && typeof newBook.author === "string") {
    bookUpdate.author = newBook.author;
  }

  if (newBook.publishedDate !== undefined) {
    bookUpdate.publishedDate = newBook.publishedDate;
  }

  if (newBook.genre !== undefined && typeof newBook.genre === "string") {
    bookUpdate.genre = newBook.genre;
  }

  const index = listBooks.findIndex((book) => book.id === Number(id));
  listBooks[index] = bookUpdate;

  serialize(jsonBooksPath, listBooks);
  return res.json(bookUpdate);
});
