import { useMutation } from "@tanstack/react-query";

interface PostReviewRequest {
  title: string;
  author: string;
  description: string;
}

export const usePostBook = () => {
  const postReview = async (book: PostReviewRequest) => {
    const response = await fetch("https://book-a8hg.onrender.com/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error("An error occurred while posting the book");
    }
    return response.json();
  };

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: postReview,
    mutationKey: ["books"],
  });

  return {
    postBook: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
