import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: String,
  title: String,
  author: String,
  isbn:String
});

const BookRecord = mongoose.model('BookList', bookSchema);
export {BookRecord};
