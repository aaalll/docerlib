let request = require('supertest');
request = request('http://127.0.0.1:8080');
const globalRes = {};

describe("GET / ", () => {
  test("It should respond object { message: 'Index' }",  (done) => {
    request.get('/')
     .expect('Content-Type', /json/)
     .expect(200)
     .end(function(err, res) {
     if (err) throw err;
       expect(res.body).toEqual({ message: "Index" });
       done();
     });
  });
});

describe("GET /not-exist ", () => {
  test("It should respond 404",  (done) => {
    request.get('/not-exist')
     .expect(404)
     .end(function(err, res) {
       if (err) throw err;
       //expect(res.body).toEqual({ message: "Index" });
       done();
     });
  });
});


describe("CREATE: /book", () => {
  test("Create book responds with json", (done) => {
    request
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


describe("CREATE: /book", () => {
  test("Wrong rating create reject", (done) => {
    request
      .post("/book")
      .send({
        Title: "Book title",
        Author: "Author Name",
        Publisher: "Publisher Name",
        Rating: 11,
        Published: "2019-08-13T16:53:26.397Z",
        Status: "CheckedIn",

      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe("CREATE: /book", () => {
  test("No title create reject", (done) => {
    request
      .post("/book")
      .send({
        Author: "Author Name",
        Publisher: "Publisher Name",
        Rating: 1,
        Published: "2019-08-13T16:53:26.397Z",
        Status: "CheckedIn",

      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        return done();
      });
  });
});


describe("READ: /book", () => {
  test("Get book list responds with json", (done) => {
    request
      .get("/book")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});


describe("READ: /book", () => {
  test("Get with parameter should return 404", (done) => {
    request
      .get("/book&2")
      .expect(404, done);
  });
});


describe("UPDATE: /book/:id", () => {
  test("Update book", (done) => {
    request
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

describe("UPDATE: /book/:id", () => {
  test("Reject update with wrong id", (done) => {
    request
      .put(`/book/a`)
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
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        globalRes.book = res.body;
        return done();
      });
  });
});



describe("UPDATE: /book/:id", () => {
  test("Reject update not exist book", (done) => {
    request
      .put(`/book/9999`)
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
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});


describe("DELETE: /book/:id", () => {
  test("Delete just created book", (done) => {
    request
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




describe("DELETE: /book/:id", () => {
  test("Reject delete with wrong id", (done) => {
    request
      .delete(`/book/z`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
