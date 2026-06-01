import { cn } from "@/lib/utils";

type Variant = "mint" | "violet" | "amber" | "dim" | "success";

const VARIANTS: Record<Variant, string> = {
  mint:    "bg-mint/10 border-mint/28 text-mint/85",
  violet:  "bg-violet/10 border-violet/28 text-violet/85",
  amber:   "bg-amber-500/10 border-amber-500/28 text-amber-400/85",
  dim:     "bg-white/[0.04] border-b-mid text-t300",
  success: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
};

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, variant = "dim", className }: Props) {
  return (
    <span className={cn(
      "inline-flex items-center font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border font-bold",
      VARIANTS[variant],
      className
    )}>
      {children}
    </span>
  );
}
