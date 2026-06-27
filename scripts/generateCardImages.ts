import * as fs from 'node:fs'
import * as path from 'node:path'
import { PNG } from 'pngjs'

const WIDTH = 300
const HEIGHT = 450
const outputDir = path.join(process.cwd(), 'public', 'assets', 'lanyard')

type Color = {
  r: number
  g: number
  b: number
  a: number
}

function rgba(r: number, g: number, b: number, a = 255): Color {
  return { r, g, b, a }
}

function hex(value: string): Color {
  const normalized = value.replace('#', '')
  return rgba(
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  )
}

function blend(base: Color, top: Color): Color {
  const alpha = top.a / 255
  const inverse = 1 - alpha

  return rgba(
    Math.round(top.r * alpha + base.r * inverse),
    Math.round(top.g * alpha + base.g * inverse),
    Math.round(top.b * alpha + base.b * inverse),
    255,
  )
}

function setPixel(image: PNG, x: number, y: number, color: Color) {
  if (x < 0 || x >= image.width || y < 0 || y >= image.height) return

  const index = (image.width * y + x) << 2
  const current = rgba(
    image.data[index],
    image.data[index + 1],
    image.data[index + 2],
    image.data[index + 3],
  )
  const next = blend(current, color)

  image.data[index] = next.r
  image.data[index + 1] = next.g
  image.data[index + 2] = next.b
  image.data[index + 3] = next.a
}

function fill(image: PNG, color: Color) {
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      setPixel(image, x, y, color)
    }
  }
}

function rect(image: PNG, x: number, y: number, w: number, h: number, color: Color) {
  for (let py = y; py < y + h; py += 1) {
    for (let px = x; px < x + w; px += 1) {
      setPixel(image, px, py, color)
    }
  }
}

function circle(image: PNG, cx: number, cy: number, radius: number, color: Color) {
  for (let y = cy - radius; y <= cy + radius; y += 1) {
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      const dx = x - cx
      const dy = y - cy
      if (dx * dx + dy * dy <= radius * radius) {
        setPixel(image, x, y, color)
      }
    }
  }
}

function circleStroke(
  image: PNG,
  cx: number,
  cy: number,
  radius: number,
  width: number,
  color: Color,
) {
  for (let y = cy - radius - width; y <= cy + radius + width; y += 1) {
    for (let x = cx - radius - width; x <= cx + radius + width; x += 1) {
      const dx = x - cx
      const dy = y - cy
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance >= radius - width && distance <= radius + width) {
        setPixel(image, x, y, color)
      }
    }
  }
}

function radialGlow(image: PNG, cx: number, cy: number, radius: number, color: Color) {
  for (let y = Math.floor(cy - radius); y <= cy + radius; y += 1) {
    for (let x = Math.floor(cx - radius); x <= cx + radius; x += 1) {
      const dx = x - cx
      const dy = y - cy
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance <= radius) {
        const alpha = Math.max(0, 1 - distance / radius)
        setPixel(image, x, y, rgba(color.r, color.g, color.b, color.a * alpha))
      }
    }
  }
}

function line(image: PNG, x1: number, y1: number, x2: number, y2: number, color: Color) {
  const dx = Math.abs(x2 - x1)
  const dy = -Math.abs(y2 - y1)
  const sx = x1 < x2 ? 1 : -1
  const sy = y1 < y2 ? 1 : -1
  let err = dx + dy
  let x = x1
  let y = y1

  while (true) {
    setPixel(image, x, y, color)
    if (x === x2 && y === y2) break
    const e2 = 2 * err
    if (e2 >= dy) {
      err += dy
      x += sx
    }
    if (e2 <= dx) {
      err += dx
      y += sy
    }
  }
}

function drawText(image: PNG, text: string, x: number, y: number, scale: number, color: Color) {
  let cursor = x
  for (const char of text.toUpperCase()) {
    if (char === ' ') {
      cursor += 4 * scale
      continue
    }
    drawGlyph(image, char, cursor, y, scale, color)
    cursor += 6 * scale
  }
}

function textWidth(text: string, scale: number) {
  return text.length * 6 * scale
}

const glyphs: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  G: ['01111', '10000', '10000', '10011', '10001', '10001', '01110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '01010', '00100', '00100', '00100', '01010', '10001'],
  Y: ['10001', '01010', '00100', '00100', '00100', '00100', '00100'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  '@': ['01110', '10001', '10111', '10101', '10111', '10000', '01110'],
  ',': ['00000', '00000', '00000', '00000', '00000', '01100', '01000'],
  '/': ['00001', '00010', '00100', '00100', '01000', '10000', '10000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
}

function drawGlyph(image: PNG, char: string, x: number, y: number, scale: number, color: Color) {
  const glyph = glyphs[char] || glyphs['-']
  glyph.forEach((row, rowIndex) => {
    row.split('').forEach((pixel, colIndex) => {
      if (pixel === '1') {
        rect(image, x + colIndex * scale, y + rowIndex * scale, scale, scale, color)
      }
    })
  })
}

function centeredText(image: PNG, text: string, y: number, scale: number, color: Color) {
  drawText(image, text, Math.round((WIDTH - textWidth(text, scale)) / 2), y, scale, color)
}

function barcode(image: PNG, x: number, y: number) {
  const bars = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 1, 4, 1, 2, 3, 1, 2]
  let cursor = x
  bars.forEach((barWidth, index) => {
    if (index % 2 === 0) {
      rect(image, cursor, y, barWidth, 34, rgba(255, 255, 255, 115))
    }
    cursor += barWidth + 2
  })
}

function createBase() {
  const image = new PNG({ width: WIDTH, height: HEIGHT })
  fill(image, hex('#0d0d1a'))
  radialGlow(image, 42, 28, 210, rgba(123, 47, 247, 72))
  radialGlow(image, 260, 410, 160, rgba(79, 195, 247, 28))
  return image
}

function createFront() {
  const image = createBase()
  circle(image, 150, 102, 60, rgba(24, 24, 48, 255))
  radialGlow(image, 132, 82, 64, rgba(123, 47, 247, 90))
  circleStroke(image, 150, 102, 60, 2, rgba(255, 255, 255, 255))

  centeredText(image, 'AYUSH', 184, 4, rgba(255, 255, 255, 255))
  centeredText(image, 'PRODUCT DESIGNER', 224, 2, hex('#7b2ff7'))
  rect(image, 40, 250, 220, 1, rgba(255, 255, 255, 26))
  drawText(image, 'NEW DELHI, INDIA', 48, 284, 2, rgba(255, 255, 255, 155))
  drawText(image, 'UI/UX BRANDING 3D', 48, 310, 2, rgba(255, 255, 255, 155))
  barcode(image, 48, 370)
  drawText(image, 'AYUSH.DESIGN', 166, 386, 2, rgba(255, 255, 255, 155))

  return image
}

function createBack() {
  const image = createBase()
  radialGlow(image, 150, 190, 150, rgba(123, 47, 247, 80))
  centeredText(image, 'A', 142, 18, rgba(255, 255, 255, 245))
  line(image, 116, 282, 184, 282, rgba(123, 47, 247, 220))
  centeredText(image, '@AYUSH', 312, 3, rgba(255, 255, 255, 170))
  rect(image, 0, 392, WIDTH, 58, hex('#7b2ff7'))
  centeredText(image, 'PRODUCT DESIGNER', 416, 2, rgba(255, 255, 255, 255))

  return image
}

function writePng(fileName: string, image: PNG) {
  fs.mkdirSync(outputDir, { recursive: true })
  const outputPath = path.join(outputDir, fileName)
  fs.writeFileSync(outputPath, PNG.sync.write(image))
  console.log(`Wrote ${outputPath}`)
}

writePng('card-front.png', createFront())
writePng('card-back.png', createBack())
