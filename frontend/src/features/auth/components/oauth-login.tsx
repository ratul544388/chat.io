import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { createUser } from "../helpers/create-user";
import { toast } from "sonner";

const OAuthLogin = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, googleProvider);
      await createUser(user);
      return user;
    },
    onSuccess: () => toast.success("Logged in"),
    onError: (error) => toast.error(error.message || "Something went wrong"),
  });
  return (
    <div className="mt-8">
      <Button
        onClick={() => mutate()}
        disabled={isPending}
        type="button"
        className="w-full"
        variant="outline"
      >
        <FcGoogle />
        Continue with Google
      </Button>
      <div className="relative">
        <Separator className="my-5" />
        <span className="absolute top-[-14.5px] px-2 bg-background left-1/2 -translate-x-1/2">
          or
        </span>
      </div>
    </div>
  );
};

export default OAuthLogin;
