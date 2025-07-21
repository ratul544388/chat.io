import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LoginValues } from "../validations";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      return user;
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      if (error.message.includes("too-many-requests")) {
        return toast.error("Too many requests. Please try again later");
      }
      if (error.message.includes("invalid-credential")) {
        return toast.error("Incorrect Email or Password");
      }
      toast.error("Something went wrong");
    },
  });

  return { login: mutate, isPending };
};
