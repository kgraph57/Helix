import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-normal ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md hover:scale-[1.02] active:bg-blue-800 active:shadow-sm active:scale-[0.98]",
        secondary:
          "bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md hover:scale-[1.02] active:bg-gray-100 active:shadow-sm active:scale-[0.98] dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm active:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        link:
          "text-blue-600 underline-offset-4 hover:underline",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md hover:scale-[1.02] active:bg-red-800 active:shadow-sm active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
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
}

const ButtonPro = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonPro.displayName = "ButtonPro";

export { ButtonPro, buttonVariants };
