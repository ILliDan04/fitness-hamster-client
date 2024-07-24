export type RGB = [number, number, number];

export const interpolateColor = (
  color1: RGB,
  color2: RGB,
  percentage: number
): RGB => {
  const r = Math.round(
    color1[0] + (color2[0] - color1[0]) * (percentage / 100)
  );
  const g = Math.round(
    color1[1] + (color2[1] - color1[1]) * (percentage / 100)
  );
  const b = Math.round(
    color1[2] + (color2[2] - color1[2]) * (percentage / 100)
  );

  return [r, g, b];
};
