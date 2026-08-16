import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#fffaf3",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 140,
            height: 140,
            borderRadius: "44% 44% 42% 42% / 50% 50% 40% 40%",
            background: "#93d9f4",
            border: "6px solid #6ec6e8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* chifres */}
          <div
            style={{
              position: "absolute",
              top: -22,
              left: 34,
              width: 16,
              height: 30,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: "#ffc9de",
              border: "3px solid #f987b2",
              transform: "rotate(-12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -22,
              right: 34,
              width: 16,
              height: 30,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: "#ffc9de",
              border: "3px solid #f987b2",
              transform: "rotate(12deg)",
            }}
          />
          {/* olhos */}
          <div style={{ display: "flex", gap: 14, marginTop: -6 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 44,
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#3d3154",
                  }}
                />
              </div>
            ))}
          </div>
          {/* bochechas */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 6,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#ffa8c9",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 30,
              right: 6,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#ffa8c9",
              opacity: 0.6,
            }}
          />
          {/* sorriso */}
          <div
            style={{
              position: "absolute",
              bottom: 26,
              width: 46,
              height: 22,
              borderBottom: "6px solid #3d3154",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
