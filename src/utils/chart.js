export function radarPoints(values, size = 220) {
  const center = size / 2
  const radius = size * 0.37
  return values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length
      const scaled = radius * (value / 100)
      return `${center + Math.cos(angle) * scaled},${center + Math.sin(angle) * scaled}`
    })
    .join(' ')
}

export function polygonPoints(count, scale, size = 220) {
  const center = size / 2
  const radius = size * scale
  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count
    return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`
  }).join(' ')
}
