import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const dims = {
    sm: { fontSize: "text-base", mark: 18 },
    md: { fontSize: "text-lg", mark: 22 },
    lg: { fontSize: "text-2xl", mark: 28 }
  }[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${SITE.shortName} home`}
    >
      <Mark size={dims.mark} />
      <span className={`font-display font-medium tracking-tighter text-paper-50 ${dims.fontSize}`}>
        {SITE.shortName}
      </span>
    </Link>
  );
}

export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="rgba(255,255,255,0.12)" />
      <path
        d="M9 22V10h2v10h5v2H9z"
        fill="#7CFF6B"
        className="transition-colors"
      />
      <circle cx="22.5" cy="11.5" r="2" fill="#7CFF6B" />
      <path
        d="M22.5 14c-2.2 0-4 1.6-4 3.7 0 2.7 2.5 4 4 4.3"
        stroke="#A6B1FF"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
