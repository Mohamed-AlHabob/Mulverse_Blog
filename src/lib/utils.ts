import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const lettersAndSymbols = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "-",
  "_",
  "+",
  "=",
  ";",
  ":",
  "<",
  ">",
  ",",
]

// Preload images
export const preloadImages = (images: string[]): Promise<void> => {
  return new Promise((resolve) => {
    let loadedCount = 0
    const totalImages = images.length

    if (totalImages === 0) {
      resolve()
      return
    }

    images.forEach((src) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = img.onerror = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          resolve()
        }
      }
      img.src = src
    })
  })
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
