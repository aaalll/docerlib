import mongoose from "mongoose";
import Counter from "./Counter";

const bookSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: false,
  },
  Publisher: {
    type: String,
    required: false,
  },
  Rating: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  Published: {
    type: Date,
    default: Date.now,
  },
  Status: {
    type: String,
    enum: [
      "CheckedIn", "CheckedOut",
    ],
    required: false,
  },
  BookId: {
    type: Number,
  },
});


function preSave(next) {
  const doc = this;
  Counter.findByIdAndUpdate({ _id: "BookId" }, { $inc: { seq: 1 } }, (error, newCounter) => {
    if (error) { return next(error); }
    if (!newCounter) {
      doc.BookId = 0;
      return Counter.create({ _id: "BookId", seq: 1 }, next);
    }
    doc.BookId = newCounter.seq;
    return next();
  });
}


bookSchema.pre("save", preSave);


const Book = mongoose.model("Book", bookSchema);

export default Book;
