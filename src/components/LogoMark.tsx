/**
 * The HackerHouse Accelerator mark.
 *
 * Geometry is the brand's own button clip-path — a rectangle with the top-right
 * and bottom-left corners cut — with a heavy H knocked out of it. Single path
 * with evenodd fill, so it survives one-colour use and stays legible at 16px.
 *
 * Keep this path in sync with src/app/icon.svg and public/brand/logo-mark.svg.
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0H50L64 14V64H14L0 50Z M18 18H27V27H37V18H46V46H37V37H27V46H18Z"
      />
    </svg>
  );
}
