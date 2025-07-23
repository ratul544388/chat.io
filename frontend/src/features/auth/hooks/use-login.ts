import { request } from "@/lib/request";
import type { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { LoginValues } from "../validations";
import { useAuthStore } from "./use-auth-store";

export const useLogin = () => {
  const { setUser } = useAuthStore();

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<
    User,
    AxiosError<{ message: string }>,
    LoginValues
  >({
    mutationFn: (values: LoginValues) =>
      request({ method: "post", url: "/auth/login", data: values }),
    onSuccess: (user) => {
      setUser(user);
      navigate("/chats");
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data.message);
    },
  });

  return { login: mutate, isPending };
};
