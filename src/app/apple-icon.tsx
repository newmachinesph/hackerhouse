import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds and masks the corners itself, so this fills the full square with
// brand orange and knocks the mark out in carbon.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f04424",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64">
          <path
            fill="#090908"
            fillRule="evenodd"
            d="M0 0H50L64 14V64H14L0 50Z M18 18H27V27H37V18H46V46H37V37H27V46H18Z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
