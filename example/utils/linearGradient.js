function zip(a, b) {
  const result = [];
  for (var i = 0; i < a.length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}

export default function linearGradient({ direction, colors, locations }) {
  const colorStops = zip(colors, locations)
    .map(pair => pair.join(" "))
    .join(", ");

  return `linear-gradient(${direction}, ${colorStops})`;
}
