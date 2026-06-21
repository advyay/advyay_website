/**
 * Subtle grid + radial glow + grain. Renders once at the layout level.
 * Pointer-events-none; never re-renders. No three.js, no framer-motion.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base canvas */}
      <div className="absolute inset-0 bg-ink-900" />

      {/* Faint grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 H 0 V 56" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)" />
      </svg>

      {/* Soft accent radial in the upper-left */}
      <div className="absolute -top-1/3 -left-1/4 h-[60vh] w-[60vh] glow-accent blur-3xl" />
      {/* Soft signal radial in the lower-right */}
      <div className="absolute top-1/2 -right-1/4 h-[55vh] w-[55vh] glow-signal blur-3xl" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.6))]" />
    </div>
  );
}

export default Background;
