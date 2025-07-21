import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  useWatch,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

const passwordRules = [
  {
    label: "At least 8 characters",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "Contains uppercase letter",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "Contains number",
    test: (pw: string) => /[0-9]/.test(pw),
  },
  {
    label: "Contains special character",
    test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
  },
];

interface FormPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  showPasswordRules?: boolean;
}

export function FormPasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  showPasswordRules = true,
}: FormPasswordInputProps<T>) {
  const [show, setShow] = useState(false);
  const [isFocus, setFocus] = useState(false);

  const passwordValue = useWatch({
    control,
    name,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                disabled={disabled}
                value={field.value || ""}
                onChange={field.onChange}
                onFocus={() => setFocus(true)}
                className="peer h-[60px] pt-4 pr-10"
              />
              <span
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none rounded-md capitalize text-muted-foreground transition-all peer-focus:top-3 peer-focus:text-sm peer-focus:text-primary",
                  field.value && "top-3 text-sm"
                )}
              >
                {label || field.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShow(!show);
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2"
                tabIndex={-1}
              >
                {show ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
          {showPasswordRules && (
            <motion.ul
              animate={isFocus ? { height: "auto" } : { height: 0 }}
              className={cn(
                "mt-2 space-y-1 h-0 text-sm text-muted-foreground overflow-hidden"
              )}
            >
              {passwordRules.map(({ label, test }) => {
                const isValid = test(passwordValue);
                return (
                  <li key={label} className="flex items-center gap-2">
                    {isValid ? (
                      <CheckCircle className="size-4 text-green-500" />
                    ) : (
                      <XCircle className="size-4 text-red-500" />
                    )}
                    {label}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </FormItem>
      )}
    />
  );
}
