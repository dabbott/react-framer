function zip(a, b) {
  const c = [];
  for (var i = 0; i < a.length; i++) {
    c.push([a[i], b[i]]);
  }
  return c;
}

export default function linearGradient({ direction, colors, locations }) {
  const colorStops = zip(colors, locations)
    .map(pair => pair.join(" "))
    .join(", ");

  return `linear-gradient(${direction}, ${colorStops})`;
}
