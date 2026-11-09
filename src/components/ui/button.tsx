import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-oxide text-paper hover:bg-ink",
        quiet: "border border-line bg-paper text-ink hover:border-ink",
        ghost: "bg-transparent text-ink hover:bg-paper-2",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ asChild, className, variant, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
