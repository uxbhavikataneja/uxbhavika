# Lanyard ID Card Face Specs

These two card face images are placeholders for Ayush's lanyard ID card. Design both at `300 x 450px`. The final lanyard texture atlas can place the front face on the left side and the back face on the right side.

## Shared Card Setup

- Canvas size: `300 x 450px`
- Corner radius recommendation: `24px`
- Safe margin: `24px`
- Background: `#0d0d1a`
- Accent violet: `#7b2ff7`
- Text white: `#ffffff`
- Muted text: `rgba(255, 255, 255, 0.62)`
- Typography:
  - Display/name: bold sans, uppercase, letter-spaced
  - Supporting text: clean sans, medium/regular

## Front Face

- Background:
  - Base fill `#0d0d1a`
  - Subtle radial violet gradient in the top-left corner, fading out by roughly `220px`
- Photo placeholder:
  - Circle: `120 x 120px`
  - Position: centered horizontally, top at `42px`
  - Border: `2px solid #ffffff`
  - Placeholder fill: dark violet/navy gradient
- Name:
  - Text: `AYUSH`
  - Font size: `28px`
  - Weight: bold
  - Letter spacing: `0.16em`
  - Color: `#ffffff`
  - Position: centered, baseline around `205px`
- Role:
  - Text: `Product Designer`
  - Font size: `14px`
  - Color: `#7b2ff7`
  - Position: centered, below name
- Divider:
  - Thin horizontal rule
  - Position: `y = 250px`
  - Width: `220px`
  - Color: `rgba(255, 255, 255, 0.1)`
- Details:
  - Font size: `11px`
  - Color: muted white
  - Row 1: `New Delhi, India`
  - Row 2: `UI/UX · Branding · 3D`
  - Position: left aligned at `x = 48px`, around `y = 286px` and `y = 310px`
- Bottom:
  - Decorative barcode: centered-ish, `110 x 34px`
  - Text: `AYUSH.DESIGN`
  - Font size: `10px`
  - Letter spacing: `0.14em`
  - Color: muted white

## Back Face

- Background:
  - Same base `#0d0d1a`
  - Optional subtle violet/pink glow behind logo
- Logo:
  - Large stylized `A` monogram
  - Position: centered
  - Approx size: `128px` high
  - Color: white with violet accent shadow/glow
- Handle:
  - Text: `@ayush`
  - Font size: `14px`
  - Color: muted white
  - Position: centered below monogram
- Bottom strip:
  - Solid violet bar: `#7b2ff7`
  - Height: `58px`
  - Position: flush bottom
  - Text: `PRODUCT DESIGNER`
  - Font size: `12px`
  - Weight: bold
  - Letter spacing: `0.16em`
  - Color: white

## Output Paths

- Front placeholder: `public/assets/lanyard/card-front.png`
- Back placeholder: `public/assets/lanyard/card-back.png`

Run the generator with:

```bash
npx ts-node scripts/generateCardImages.ts
```
