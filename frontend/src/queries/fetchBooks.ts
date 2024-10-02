import { useQuery } from "@tanstack/react-query";
import { Book } from "../features/bookSlice";

export const useFetchBooks = () => {
  const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch(`http://localhost:5000/api/books`);
    if (!response.ok) {
      throw new Error("An error occurred while fetching the books");
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return {
    allBooks: data,
    isLoading,
    isError,
  };
};
