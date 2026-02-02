import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const segments = [
  { text: "Think", start: 0, end: 37 },
  { text: "Build", start: 37, end: 75 },
  { text: "Ship", start: 75, end: 112 },
  { text: "Repeat", start: 112, end: 150 },
];

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {segments.map(({ text, start, end }, i) => {
        const mid = (start + end) / 2;

        let opacity: number;
        let transform = "none";
        let filter = "none";

        if (i === 0) {
          // Scale up + fade
          opacity = interpolate(frame, [start, start + 10, mid + 5, end], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(frame, [start, start + 10, mid + 5, end], [0.5, 1, 1, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          transform = `scale(${scale})`;
        } else if (i === 1) {
          // Slide up
          opacity = interpolate(frame, [start, start + 8, mid + 8, end], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame, [start, start + 8, mid + 8, end], [60, 0, 0, -60], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          transform = `translateY(${y}px)`;
        } else if (i === 2) {
          // Blur in/out
          opacity = interpolate(frame, [start, start + 10, mid + 5, end], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const blur = interpolate(frame, [start, start + 10, mid + 5, end], [20, 0, 0, 20], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          filter = `blur(${blur}px)`;
        } else {
          // Snap in with rotate
          opacity = interpolate(frame, [start, start + 3, mid + 10, end], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rotate = interpolate(frame, [start, start + 8], [-3, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(frame, [start, start + 3], [1.3, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          transform = `rotate(${rotate}deg) scale(${scale})`;
        }

        return (
          <h1
            key={i}
            style={{
              position: "absolute",
              color: "white",
              fontSize: 80,
              fontWeight: "bold",
              opacity,
              transform,
              filter,
            }}
          >
            {text}
          </h1>
        );
      })}
    </AbsoluteFill>
  );
};
