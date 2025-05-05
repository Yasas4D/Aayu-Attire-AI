
import { Inter as FontSans, Playfair_Display as FontSerif } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Example of adding a serif font for headings if desired
export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"], // Include weights you might use
})
