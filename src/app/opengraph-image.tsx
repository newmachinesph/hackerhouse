import { ImageResponse } from "next/og";

export const alt = "HackerHouse Accelerator — six live-in houses across Metro Manila and Clark";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens mirror the :root values in app/globals.css.
const CARBON = "#090908";
const BONE = "#ede8de";
const SIGNAL = "#f04424";
const MUTED = "#b9b2a6";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: CARBON,
          color: BONE,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            color: MUTED,
          }}
        >
          <span>HACKERHOUSE ACCELERATOR</span>
          <span>MANILA / COHORT 01</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <span style={{ fontSize: 260, fontWeight: 800, letterSpacing: -12, lineHeight: 1 }}>
              10x
            </span>
            <div
              style={{
                display: "flex",
                width: 120,
                height: 28,
                marginLeft: 32,
                marginBottom: 46,
                background: SIGNAL,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              marginTop: 12,
            }}
          >
            LIVE WHERE THE WORK GETS SERIOUS.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: `1px solid ${MUTED}`,
            fontSize: 24,
            letterSpacing: 1,
            color: MUTED,
          }}
        >
          <span>ONE KPI / ONE YEAR</span>
          <span style={{ color: SIGNAL }}>SIX HOUSES / MANILA + CLARK</span>
        </div>
      </div>
    ),
    size,
  );
}
