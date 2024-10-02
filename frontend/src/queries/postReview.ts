import { useMutation } from "@tanstack/react-query";

interface PostReviewRequest {
  name: string;
  comment: string;
  rating: number;
  book: string;
}

export const usePostReview = (id: string) => {
  const postReview = async (review: PostReviewRequest) => {
    const response = await fetch("https://book-a8hg.onrender.com/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      throw new Error("An error occurred while posting the review");
    }
    return response.json();
  };

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: postReview,
    mutationKey: ["book", id],
  });

  return {
    postReview: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
