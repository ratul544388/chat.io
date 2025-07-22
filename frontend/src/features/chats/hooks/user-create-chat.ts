import { request } from "@/lib/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateChat = () => {
  const { data } = useMutation({
    mutationFn: () => request({ method: "post", url: "/chats" }),
  });

  console.log(data);
};
