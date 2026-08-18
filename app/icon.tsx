import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 7,
          background: "#00b5ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#030a1a",
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        N
      </div>
    ),
    size
  );
}
