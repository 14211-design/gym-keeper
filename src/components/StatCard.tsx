import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "success" | "danger" | "warning";
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}: StatCardProps) => {
  const variants = {
    default: "from-primary/20 to-primary/5 border-primary/20",
    success: "from-success/20 to-success/5 border-success/20",
    danger: "from-destructive/20 to-destructive/5 border-destructive/20",
    warning: "from-warning/20 to-warning/5 border-warning/20",
  };

  const iconVariants = {
    default: "bg-primary/20 text-primary",
    success: "bg-success/20 text-success",
    danger: "bg-destructive/20 text-destructive",
    warning: "bg-warning/20 text-warning",
  };

  return (
    <div
      className={cn(
        "stat-card rounded-2xl bg-gradient-to-br p-6 opacity-0 animate-slide-up",
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-display text-4xl tracking-wide text-foreground">
            {value}
          </p>
          {trend && (
            <p className="mt-2 text-xs text-muted-foreground">{trend}</p>
          )}
        </div>
        <div className={cn("rounded-xl p-3", iconVariants[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
