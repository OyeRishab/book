import { createSlice } from "@reduxjs/toolkit";

export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  featured: boolean;
  reviews: Review[];
}

export interface Review {
  _id?: string;
  name: string;
  comment: string;
  rating: number;
}

interface InitialState {
  books: Book[];
}

const initialState: InitialState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    addBook(state, action) {
      state.books.push(action.payload);
    },
    removeBook(state, action) {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
  },
});

export const { setBooks, addBook, removeBook } = booksSlice.actions;

export default booksSlice.reducer;
