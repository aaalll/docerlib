import request from "supertest";
import app from "../src/app";

const globalRes = {};

describe("GET / ", () => {
  test("It should respond object { message: 'Index' }", async (done) => {
    const runApp = await request(app);
    const response = await runApp.get("/");
    expect(response.body).toEqual({ message: "Index" });
    expect(response.statusCode).toBe(200);
    done();
  });
});

describe("CREATE: /book", () => {
  test("responds with json", (done) => {
    request(app)
      .post("/book")
      .send({
        Title: "Book title",
        Author: "Author Name",
        Publisher: "Publisher Name",
        Rating: 1,
        Published: "2019-08-13T16:53:26.397Z",
        Status: "CheckedIn",

      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        globalRes.book = res.body;
        globalRes.BookId = res.body.Book.BookId;
        return done();
      });
  });
});


describe("READ: /book", () => {
  test("responds with json", (done) => {
    request(app)
      .get("/book")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});


describe("UPDATE: /book/:id", () => {
  test("responds with json", (done) => {
    request(app)
      .put(`/book/${globalRes.BookId}`)
      .send({
        Title: "New Book title",
        Author: "New Author Name",
        Publisher: "New Publisher Name",
        Rating: 2,
        Published: "2019-08-13T16:53:26.397Z",
        Status: "CheckedOut",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        globalRes.book = res.body;
        return done();
      });
  });
});


describe("DELETE: /book/:id", () => {
  test("responds with json", (done) => {
    request(app)
      .delete(`/book/${globalRes.BookId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual({ message: "Book deleted successfully" });
        return done();
      });
  });
});
