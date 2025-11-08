import express from "express";
import { booksController } from "./controllers/books.controller";


// creates an express app
export const app = express();
app.use(express.json());

app.use(express.json());

app.use("/books", booksController);

app.get('/', (_req, res) => {
  res.send('Hello TypeScript + Express GEEENIAAAAALLLLL!');
});
