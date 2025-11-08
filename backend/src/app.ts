import express from "express";
import path from "node:path";
import { booksController } from "./controllers/books.controller";
import { usersController } from "./controllers/users.controller";


// creates an express app
export const app = express();
app.use(express.json());

app.use("/books", booksController);
app.use("/users", usersController);

app.get('/', (_req, res) => {
  res.send('Hello TypeScript + Express GEEENIAAAAALLLLL!');
});
