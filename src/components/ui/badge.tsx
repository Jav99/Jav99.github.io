import { cn } from "@/lib/utils";

type BadgeVariant = "elite" | "rising" | "needs-architecting" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  elite: "bg-teal-100 text-teal-700 border-teal-200",
  rising: "bg-amber-50 text-amber-700 border-amber-200",
  "needs-architecting": "bg-slate-100 text-slate-600 border-slate-200",
  default: "bg-slate-100 text-slate-600 border-slate-200",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
