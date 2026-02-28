"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg" | "sm";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-teal-500 hover:bg-teal-600 text-white shadow-glow hover:shadow-glow-lg",
  secondary:
    "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  default: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  children,
  href,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={springTransition}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}
