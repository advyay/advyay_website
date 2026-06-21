import type { HTMLAttributes, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav" | "article";
} & HTMLAttributes<HTMLElement>) {
  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`container-app ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
