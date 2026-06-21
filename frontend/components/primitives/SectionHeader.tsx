interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = ""
}: SectionHeaderProps) {
  const alignCls =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <header className={`max-w-3xl ${alignCls} ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 display-heading text-h2 md:text-[3rem] text-paper-50">{title}</h2>
      {description ? (
        <p className="mt-5 text-body-lg text-paper-200">{description}</p>
      ) : null}
    </header>
  );
}
