import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/form-input";
import { FormPasswordInput } from "@/components/form-password-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/features/auth/hooks/use-login";
import { loginSchema, type LoginValues } from "@/features/auth/validations";
import { Link } from "react-router";

const Login = () => {
  const { login, isPending } = useLogin();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "ratul@gmail.com",
      password: "Ratul544@",
    },
  });

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background border rounded-xl shadow">
      <div>
        <h2 className="text-2xl font-bold">Login to Your Account</h2>
        <p className="text-muted-foreground text-pretty text-sm">
          Access your messages and connect with people in real time.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => login(values))}
          className="flex flex-col gap-5 mt-8"
        >
          <FormInput control={form.control} name="email" disabled={isPending} />
          <FormPasswordInput
            showPasswordRules={false}
            control={form.control}
            name="password"
            disabled={isPending}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
      <div className="text-sm font-medium text-center mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
