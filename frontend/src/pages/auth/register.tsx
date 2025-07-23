import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/form-input";
import { FormPasswordInput } from "@/components/form-password-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRegister } from "@/features/auth/hooks/use-register";
import {
  registerSchema,
  type RegisterValues,
} from "@/features/auth/validations";
import { Link } from "react-router";

const Register = () => {
  const { register, isPending } = useRegister();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "ratul@gmail.com",
      password: "Ratul544@",
    },
  });

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background border rounded-xl shadow">
      <div>
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-muted-foreground text-pretty text-sm">
          Join Chat.io to start chatting in real time. Create your account to
          access fast and secure messaging features today!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => register(values))}
          className="flex flex-col gap-5 mt-8"
        >
          <FormInput
            control={form.control}
            name="name"
            autoFocus
            disabled={isPending}
          />
          <FormInput control={form.control} name="email" disabled={isPending} />
          <FormPasswordInput
            control={form.control}
            name="password"
            disabled={isPending}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
      <div className="text-sm font-medium text-center mt-6">
        Alraedy have an account?{" "}
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
