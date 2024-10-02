import { useQuery } from "@tanstack/react-query";
import { Book } from "../features/bookSlice";

export const useFetchBooks = () => {
  const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch(`https://book-a8hg.onrender.com/api/books`);
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
