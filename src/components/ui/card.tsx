import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
}

export function Card({ className, featured, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-clay border border-slate-100 p-10 transition-shadow duration-300 hover:shadow-clay-hover",
        featured && "border-violet-200 ring-1 ring-violet-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
