import { IndexController, BookController } from "../controllers";

export default function routes(app) {
  app.get("/", IndexController.index);

  app.get("/book", BookController.search);
  app.post("/book", BookController.create);
  app.get("/book/:id", BookController.get);
  app.put("/book/:id", BookController.update);
  app.delete("/book/:id", BookController.delete);
}
