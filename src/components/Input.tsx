import { Label, Input as HeroInput } from "@heroui/react";
import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<typeof HeroInput> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? crypto.randomUUID();

    return (
      <div className="flex flex-col gap-1">
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <HeroInput
          ref={ref}
          id={inputId}
          className={className}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;