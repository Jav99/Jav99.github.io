"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import gsap from "gsap";

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
  const ref = useRef<HTMLElement>(null);

  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const handleEnter = () => {
      gsap.to(el, { scale: 1.02, duration: 0.25, ease: "back.out(2)" });
    };
    const handleLeave = () => {
      gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" });
    };
    const handleDown = () => {
      gsap.to(el, { scale: 0.98, duration: 0.1, ease: "power2.in" });
    };
    const handleUp = () => {
      gsap.to(el, { scale: 1.02, duration: 0.1, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("mousedown", handleDown);
    el.addEventListener("mouseup", handleUp);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("mousedown", handleDown);
      el.removeEventListener("mouseup", handleUp);
      gsap.killTweensOf(el);
    };
  }, [disabled]);

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
