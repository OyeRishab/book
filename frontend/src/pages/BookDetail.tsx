// src/pages/BookDetail.tsx
import { useParams } from "react-router-dom";
import { useFetchBook } from "../queries/fetchBook";
import { useState } from "react";
import { usePostReview } from "../queries/postReview";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useFetchBook(id!);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const { postReview, isSuccess, isPending } = usePostReview(id!);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment || rating < 0 || rating > 5) {
      setError("Please fill out all fields correctly.");
      return;
    }
    setError("");
    const review = { book: id!, name, comment, rating };
    postReview(review);
    refetch();
    setName("");
    setComment("");
    setRating(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {id}</div>;

  if (data)
    return (
      <div>
        <h1>{data.book.title}</h1>
        <h3>by : {data.book.author}</h3>
        <h3>{data.book.description}</h3>
        <hr />
        <h2>Reviews</h2>
        {data.reviews &&
          data.reviews.map((review) => (
            <div
              key={review._id}
              style={{
                backgroundColor: "lightgray",
                padding: "4px",
                marginBottom: "8px",
              }}
            >
              <p>{review.name}</p>
              <p>{review.comment}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              value={rating}
              min={0}
              max={5}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button disabled={isPending || isSuccess} type="submit">
            Submit Review
          </button>
        </form>
      </div>
    );
};

export default BookDetail;
