import request from "supertest";
import { app } from "../src/app";

// Test suite for Books Controller
describe("GET /books", () => {
  it("should return all books (2)", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});

// Tests for getting books by author
describe("GET /books/author/:author", () => {
  it("should return books by the specified author", async () => {
    const response = await request(app).get("/books/author/Harper Lee");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].author).toBe("Harper Lee");
  });
});

// Tests for getting books by invalid author
describe("GET /books/author/:author with invalid author", () => {
  it("should return 404 for invalid author", async () => {
    const response = await request(app).get("/books/author/123456");
    expect(response.status).toBe(404);
  });
});

// Tests for getting books by genre
describe("GET /books/genre/:genre", () => {
  it("should return books by the specified genre", async () => {
    const response = await request(app).get("/books/genre/Fiction");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].genre).toBe("Fiction");
    expect(response.body[1].genre).toBe("Fiction");
  });
});

// Tests for getting books by invalid genre
describe("GET /books/genre/:genre with invalid genre", () => {
  it("should return 404 for invalid genre", async () => {
    const response = await request(app).get("/books/genre/123456");
    expect(response.status).toBe(404);
  });
});

// Tests for getting books by published year
describe("GET /books/publishedYear/:year", () => {
  it("should return books published in the specified year", async () => {
    const response = await request(app).get("/books/publishedYear/1960");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(new Date(response.body[0].publishedDate).getFullYear()).toBe(1960);
  });
});

// Tests for getting books by invalid published year
describe("GET /books/publishedYear/:year with invalid year", () => {
  it("should return 404 for invalid published year", async () => {
    const response = await request(app).get("/books/publishedYear/123456");
    expect(response.status).toBe(404);
  });
});

// Tests for getting books by title keyword
describe("GET /books/title/:keyword", () => {
  it("should return books with the specified title keyword", async () => {
    const response = await request(app).get("/books/title/19");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("1984");
  });
});

// Tests for getting books by invalid title keyword
describe("GET /books/title/:keyword with invalid keyword", () => {
  it("should return 404 for invalid title keyword", async () => {
    const response = await request(app).get("/books/title/123456");
    expect(response.status).toBe(404);
  });
});

// Tests for creating a new book with admin privileges
describe("POST /books", () => {
  it("should create a new book with valid data & admin privileges", async () => {
    const date = new Date("2008-08-01");
    const validBook = {
      title: "Clean Code",
      author: "Robert C. Martin",
      publishedDate: date,
      genre: "Programming",
    };
    const response = await request(app).post("/books?queryId=1").send(validBook);
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe(validBook.title);
    expect(response.body.author).toBe(validBook.author);
    expect(new Date(response.body.publishedDate).toISOString()).toBe(
      new Date(validBook.publishedDate).toISOString()
    );
    expect(response.body.genre).toBe(validBook.genre);
  });
});

//tests for creating a book without admin privileges
describe("POST /books without admin privileges", () => {
  it("should return 403 Forbidden when user is not an admin", async () => {
    const date = new Date("2008-08-01");
    const validBook = {
      title: "Clean Code",
      author: "Robert C. Martin",
      publishedDate: date,
      genre: "Programming",
    };
    const response = await request(app).post("/books?queryId=3").send(validBook);
    expect(response.status).toBe(403);
  });
});


// Tests for creating a book with invalid data
describe("POST /books", () => {
  it("should create a new book with invalid data", async () => {
    const date = new Date("2008-08-01");
    const validBook = {
      author: "Robert C. Martin",
      publishedDate: date,
      genre: "Programming",
    };
    const response = await request(app).post("/books?queryId=1").send(validBook);
    expect(response.status).toBe(400);
  });
});

// Tests for deleting a book by valid ID with admin privileges
describe("DELETE /books/:id with admin privileges", () => {
  it("should delete the book with the specified ID", async () => {
    const response = await request(app).delete("/books/4?queryId=1");
    expect(response.status).toBe(204);
  });
});

// Tests for deleting a book by invalid ID
describe("DELETE /books/:id with invalid ID", () => {
  it("should return 404 for non-existing book ID", async () => {
    const response = await request(app).delete("/books/9999?queryId=1");
    expect(response.status).toBe(404);
  });
});

// Tests for deleting a book with non-numeric ID
describe("DELETE /books/:id with non-numeric ID", () => {
  it("should return 400 for non-numeric book ID", async () => {
    const response = await request(app).delete("/books/a?queryId=1");
    expect(response.status).toBe(400);
  });
});

// Tests for deleting a book with undefined ID
describe("DELETE /books/:id with undefined ID", () => {
  it("should return 400 for undefined book ID", async () => {
    const response = await request(app).delete("/books/undefined?queryId=1");
    expect(response.status).toBe(400);
  });
});

//Test for deleting a book without admin privileges
describe("DELETE /books/:id without admin privileges", () => {
  it("should return 403 Forbidden when user is not an admin", async () => {
    const response = await request(app).delete("/books/4?queryId=3");
    expect(response.status).toBe(403);
  });
});

//Test update a book (all fields) with admin privileges
describe("PUT /books/:id with admin privileges", () => {
  it("should update the book with the specified ID", async () => {
    const updatedBook = {
      title: "The Great Gatsby - Updated",
      author: "F. Scott Fitzgerald - Updated",
      publishedDate: new Date("2025-04-10"),
      genre: "Classic Literature",
    };
    const response = await request(app).put("/books/1?queryId=1").send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
    expect(response.body.author).toBe(updatedBook.author);
    expect(new Date(response.body.publishedDate).toISOString()).toBe(
      new Date(updatedBook.publishedDate).toISOString()
    );
    expect(response.body.genre).toBe(updatedBook.genre);
  });
});

// Test update a book (title only)
describe("PUT /books/:id", () => {
  it("should update the book with the specified ID", async () => {
    const updatedBook = {
      title: "The Great Gatsby - Updated 2",
    };
    const response = await request(app).put("/books/1?queryId=1").send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
  });
});

// Update the tested book back to original
describe("PUT /books/:id to original", () => {
  it("should update the book back to original", async () => {
    const updatedBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedDate: new Date("1925-04-10"),
      genre: "Fiction",
    };
    const response = await request(app).put("/books/1?queryId=1").send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedBook.title);
    expect(response.body.author).toBe(updatedBook.author);
    expect(new Date(response.body.publishedDate).toISOString()).toBe(
      new Date(updatedBook.publishedDate).toISOString()
    );
    expect(response.body.genre).toBe(updatedBook.genre);
  });
});

// Test update a book with invalid ID
describe("PUT /books/:id with invalid ID", () => {
  it("should return 404 for non-existing book ID", async () => {
    const updatedBook = {
      title: "Non-Existing Book",
    };
    const response = await request(app).put("/books/9999?queryId=1").send(updatedBook);
    expect(response.status).toBe(404);
  });
});

// Test update a book invalid parameters
describe("PUT /books/:id with invalid parameters", () => {
  it("should return 400 for non-numeric book ID", async () => {
    const updatedBook = {
      title: 2,
      author: 3,
      publishedDate: 2,
      genre: 4,
    };
    const response = await request(app).put("/books/abc?queryId=1").send(updatedBook);
    expect(response.status).toBe(400);
  });
});

//Test for updating a book without admin privileges
describe("PUT /books/:id without admin privileges", () => {
  it("should return 403 Forbidden when user is not an admin", async () => {
    const updatedBook = {
      title: "The Great Gatsby - Updated",
      author: "F. Scott Fitzgerald - Updated",
      publishedDate: new Date("2025-04-10"),
      genre: "Classic Literature",
    };
    const response = await request(app).put("/books/1?queryId=3").send(updatedBook);
    expect(response.status).toBe(403);
  });
});
