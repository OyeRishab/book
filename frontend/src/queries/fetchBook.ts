import { useQuery } from "@tanstack/react-query";
import { Book, Review } from "../features/bookSlice";

interface FetchBooksResponse {
  book: Book;
  reviews: Review[];
}

export const useFetchBook = (id: string) => {
  const fetchBook = async (): Promise<FetchBooksResponse> => {
    const response = await fetch(
      `https://book-a8hg.onrender.com/api/books/${id}`
    );
    if (!response.ok) {
      throw new Error("An error occurred while fetching the books");
    }
    return response.json();
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: fetchBook,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
