import {isBook} from "../src/utils/books.utils";

test("isBook returns false for book with invalid title", () => {
    const data = {
        id: 1,
        title: 123,
        author: "F. Scott Fitzgerald",
        publishedDate: new Date("1925-04-10"),
        genre: "Fiction",
    };
    expect(isBook(data)).toBe(false);
});

test("isBook returns false for book with invalid author", () => {
    const data = {
        id: 1,
        title: "The Great Gatsby",
        author: 123,
        publishedDate: new Date("1925-04-10"),
        genre: "Fiction",
    };
    expect(isBook(data)).toBe(false);
});

test("isBook returns false for a book with invalid publishedDate", () => {
    const data = {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedDate: "1925-04-10",
        genre: "Fiction",
    };
    expect(isBook(data)).toBe(false);
});

test("isBook returns false for book with invalid genre", () => {
    const data = {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedDate: new Date("1925-04-10"),
        genre: 123,
    };
    expect(isBook(data)).toBe(false);
});

test("isBook returns false for a book with invalid id", () => {
    const data = {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedDate: new Date("1925-04-10"),
        genre: "Fiction",
    };
    expect(isBook(data)).toBe(false);
});

test("isBook returns false for non-object data", () => {
    const data = "data";
    expect(isBook(data)).toBe(false);
});

test("isBook returns true for a valid book", () => {
    const data = {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publishedDate: new Date("1925-04-10"),
        genre: "Fiction",
    };
    expect(isBook(data)).toBe(true);
});

