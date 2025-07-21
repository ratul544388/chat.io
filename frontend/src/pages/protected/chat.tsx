import { request } from "@/lib/request";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";

const Chat = () => {
  const { chatId } = useParams();

  console.log(chatId);

  const { data, isPending } = useMutation<
    { message: string },
    { error: string }
  >({
    mutationFn: () => request({ url: "" }),
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: ({ error }) => {
      console.log(error);
    },
  });

  return <div></div>;
};

export default Chat;
