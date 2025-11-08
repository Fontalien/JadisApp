/// <reference types="jest" />
import request from "supertest";
import { app } from "../src/app";

describe("GET /users", () => {
  it("should return all users (2)", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
