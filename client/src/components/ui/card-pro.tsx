import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg transition-all duration-normal ease-smooth",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm",
        elevated:
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-[2px]",
        bordered:
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
        ghost:
          "bg-transparent",
        info:
          "bg-blue-100 dark:bg-blue-900/40 border-l-[3px] border-blue-500 dark:border-blue-400 shadow-sm",
        success:
          "bg-green-100 dark:bg-green-900/40 border-l-[3px] border-green-500 dark:border-green-400 shadow-sm",
        warning:
          "bg-yellow-100 dark:bg-yellow-900/40 border-l-[3px] border-yellow-500 dark:border-yellow-400 shadow-sm",
        error:
          "bg-red-100 dark:bg-red-900/40 border-l-[3px] border-red-500 dark:border-red-400 shadow-sm",
      },
      padding: {
        none: "p-0",
        sm: "p-2",
        default: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface CardProProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardPro = React.forwardRef<HTMLDivElement, CardProProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
CardPro.displayName = "CardPro";

const CardProHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardProHeader.displayName = "CardProHeader";

const CardProTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardProTitle.displayName = "CardProTitle";

const CardProDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
    {...props}
  />
));
CardProDescription.displayName = "CardProDescription";

const CardProContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardProContent.displayName = "CardProContent";

const CardProFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardProFooter.displayName = "CardProFooter";

export { CardPro, CardProHeader, CardProTitle, CardProDescription, CardProContent, CardProFooter };
