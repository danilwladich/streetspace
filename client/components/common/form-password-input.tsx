"use client";

import { type HTMLInputAutoCompleteAttribute, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function FormPasswordInput({
  field,
  autoComplete = "current-password",
  placeholder,
  disabled,
}: {
  field: any;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  placeholder: string;
  disabled: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-2">
      <FormControl>
        <Input
          {...field}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
        />
      </FormControl>

      <Button
        variant="ghost"
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
