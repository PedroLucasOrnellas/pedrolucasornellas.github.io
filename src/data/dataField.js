const pointsPerLine = 8
const totalLines = 6

const frameTargets = [
  [58, 18], [65, 13], [72, 20], [80, 14], [88, 22], [94, 18], [91, 34], [82, 31],
  [61, 34], [69, 29], [76, 38], [86, 42], [95, 48], [90, 58], [78, 54], [68, 48],
  [56, 52], [63, 62], [73, 66], [84, 72], [94, 68], [88, 82], [75, 78], [64, 74],
  [59, 82], [70, 88], [82, 90], [93, 86], [96, 36], [92, 28], [84, 25], [74, 24],
  [66, 21], [62, 42], [72, 46], [82, 50], [90, 52], [96, 60], [86, 64], [76, 60],
  [60, 68], [68, 70], [78, 72], [88, 76], [96, 78], [91, 90], [80, 84], [70, 80],
]

const sizePattern = [
  2, 4, 2, 4, 2, 6, 2, 4,
  2, 2, 6, 2, 4, 2, 4, 2,
  4, 2, 2, 6, 2, 4, 2, 2,
  2, 4, 2, 6, 2, 4, 2, 2,
  6, 2, 4, 2, 2, 4, 6, 2,
  2, 4, 2, 2, 4, 2, 6, 2,
]

export const dataPoints = Array.from({ length: totalLines * pointsPerLine }, (_, index) => {
  const line = Math.floor(index / pointsPerLine)
  const point = index % pointsPerLine

  return {
    line,
    point,
    final: frameTargets[index],
    size: sizePattern[index],
    delay: 0.012 * point + 0.018 * line,
    duration: 1.28 + ((index % 6) * 0.08),
  }
})

export const dataConnections = [
  [0, 1], [2, 3], [4, 5], [6, 7],
  [9, 10], [10, 14], [11, 12], [13, 20],
  [17, 18], [19, 22], [25, 26], [28, 29],
  [34, 35], [38, 42],
]

export const POINTS_PER_LINE = pointsPerLine
