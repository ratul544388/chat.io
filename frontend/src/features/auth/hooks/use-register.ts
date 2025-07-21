import { auth } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createUser } from "../helpers/create-user";
import type { RegisterValues } from "../validations";

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const { user: createdUser } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(createdUser, { displayName: values.name });
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await createUser(user);
      return user;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/chats");
    },
    onError: (error) => {
      if (error.message.includes("email-already-in-use")) {
        return toast.error("This email is already registered.");
      }
      return toast.error(error.message);
    },
  });

  return { register: mutate, isPending };
};
