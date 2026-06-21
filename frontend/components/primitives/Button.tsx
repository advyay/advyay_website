import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  type?: "button" | "submit";
}

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-body-sm",
  md: "px-5 py-2.5 text-body-sm",
  lg: "px-7 py-3.5 text-body"
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-ink-900 hover:bg-accent-600 hover:-translate-y-px hover:shadow-glow",
  secondary:
    "bg-transparent text-paper-100 border border-white/10 hover:bg-white/[0.04] hover:border-white/20",
  ghost: "bg-transparent text-paper-200 hover:text-paper-50"
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  icon,
  external = false,
  type = "button"
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-enterprise will-change-transform focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const cls = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls}>
      {content}
    </button>
  );
}

export type { ButtonProps };
type AnchorProps = ComponentProps<"a">;
export const Span = (props: AnchorProps) => null;
