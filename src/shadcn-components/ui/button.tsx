import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shadcn-lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "w-12 h-12 flex justify-center items-center",
        red: "bg-rose-500 uppercase font-bold text-lg border-2 border-slate-900 shadow-big-red-btn hover:brightness-90",
        "red-small":
          "bg-rose-500 uppercase font-bold border leading-none border-slate-900 shadow-red-btn hover:brightness-90",
        yellow:
          "bg-yellow-300 uppercase font-bold text-lg text-slate-900 border-2 border-slate-900 shadow-yellow-btn hover:brightness-90",
        square:
          "bg-white bg-opacity-10 w-12 h-12 flex justify-center items-center hover:bg-opacity-20",
        "square-active":
          "bg-white w-12 h-12 flex justify-center items-center hover:brightness-90",
      },
      size: {
        nosize: "",
        default: "h-12 w-12",
        sm: "h-9 rounded-md px-3",
        md: "py-6 px-5",
        lg: "pt-6 pb-7 px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn("relative", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
