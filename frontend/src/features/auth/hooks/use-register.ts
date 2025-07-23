import { request } from "@/lib/request";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { RegisterValues } from "../validations";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { useAuthStore } from "./use-auth-store";
import type { User } from "@/types";

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation<
    User,
    AxiosError<{ message: string }>,
    RegisterValues
  >({
    mutationFn: (data: RegisterValues) =>
      request({ method: "post", url: "/auth/register", data }),
    onSuccess: (user) => {
      setUser(user);
      navigate("/chats");
      toast.success("Account created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });

  return { register: mutate, isPending };
};
