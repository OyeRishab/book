import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import { setBooks } from "../features/bookSlice";
import { useFetchBooks } from "../queries/fetchBooks";
import { usePostBook } from "../queries/postBook";

const Home = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state: RootState) => state.books);
  const { allBooks, isError, isLoading } = useFetchBooks();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { postBook, isSuccess, isPending } = usePostBook();

  useEffect(() => {
    if (allBooks) {
      dispatch(setBooks(allBooks));
    }
  }, [allBooks, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setAuthor("");
      setDescription("");
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !description) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    postBook({ title, author, description });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching books</div>;

  return (
    <div>
      <h1>Featured Books</h1>
      <div
        className="book-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {books.map((book) => (
          <div
            key={book._id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <Link to={`/book/${book._id as string}`}>View Details</Link>
          </div>
        ))}
      </div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isPending || isSuccess}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Home;
