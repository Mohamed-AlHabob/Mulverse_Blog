"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import type { Card as CardType } from "@/types"
import { gsap } from "gsap"
import { lettersAndSymbols } from "@/lib/utils"

type CardProps = {
  card: CardType
  settings: {
    orientation: "vertical" | "horizontal"
    slicesTotal: number
    animation?: {
      duration: number
      ease: string
    }
  }
  isMiddleColumn: boolean
}

export default function Card({ card, settings, isMiddleColumn }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const slicesRef = useRef<HTMLDivElement[]>([])

  // Split text for animation
  useEffect(() => {
    if (dateRef.current && titleRef.current && linkRef.current) {
      // Split text into spans for animation
      splitText(dateRef.current)
      splitText(titleRef.current)
      splitText(linkRef.current)
    }
  }, [])

  // Create slices for the image
  useEffect(() => {
    if (imgRef.current && imgWrapRef.current) {
      // Clear any existing slices
      imgWrapRef.current.innerHTML = ""
      slicesRef.current = []

      // Create slices
      for (let i = 0; i < settings.slicesTotal; i++) {
        const slice = document.createElement("div")
        slice.className = "card__img-inner absolute top-0 left-0 w-full h-full bg-cover bg-center filter brightness-60"
        slice.style.backgroundImage = `url(${card.image})`
        imgWrapRef.current.appendChild(slice)
        slicesRef.current.push(slice)
      }

      // Set CSS variable for columns or rows
      if (settings.orientation === "vertical") {
        imgRef.current.style.setProperty("--columns", settings.slicesTotal.toString())
      } else {
        imgRef.current.style.setProperty("--rows", settings.slicesTotal.toString())
      }

      // Set clip paths
      setClipPaths()
    }
  }, [card.image, settings.orientation, settings.slicesTotal])

  // Set clip paths for slices
  const setClipPaths = () => {
    slicesRef.current.forEach((slice, position) => {
      const a1 = (position * 100) / settings.slicesTotal
      const b1 = (position * 100) / settings.slicesTotal + 100 / settings.slicesTotal

      const clipPath =
        settings.orientation === "vertical"
          ? `polygon(${a1}% 0%, ${b1}% 0%, ${b1}% 100%, ${a1}% 100%)`
          : `polygon(0% ${a1}%, 100% ${a1}%, 100% ${b1}%, 0% ${b1}%)`

      gsap.set(slice, { clipPath })

      // Offset to solve gap issues
      if (settings.orientation === "vertical") {
        gsap.set(slice, { left: position * -1 })
      } else {
        gsap.set(slice, { top: position * -1 })
      }
    })
  }

  // Handle mouse enter
  const handleMouseEnter = () => {
    const isVertical = settings.orientation === "vertical"

    // Shuffle characters
    shuffleChars(dateRef.current)
    shuffleChars(titleRef.current)
    shuffleChars(linkRef.current)

    // Animate image and slices
    gsap
      .timeline({
        defaults: {
          duration: settings.animation?.duration || 0.5,
          ease: settings.animation?.ease || "power3.inOut",
        },
      })
      .addLabel("start", 0)
      .fromTo(
        imgRef.current,
        {
          [isVertical ? "yPercent" : "xPercent"]: 100,
          opacity: 0,
        },
        {
          [isVertical ? "yPercent" : "xPercent"]: 0,
          opacity: 1,
        },
        "start",
      )
      .fromTo(
        imgWrapRef.current,
        {
          [isVertical ? "yPercent" : "xPercent"]: -100,
        },
        {
          [isVertical ? "yPercent" : "xPercent"]: 0,
        },
        "start",
      )
      .fromTo(
        slicesRef.current,
        {
          [isVertical ? "yPercent" : "xPercent"]: (pos: number) =>
            pos % 2 ? gsap.utils.random(-75, -25) : gsap.utils.random(25, 75),
        },
        {
          [isVertical ? "yPercent" : "xPercent"]: 0,
        },
        "start",
      )
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    const isVertical = settings.orientation === "vertical"

    gsap
      .timeline({
        defaults: {
          duration: settings.animation?.duration || 0.5,
          ease: settings.animation?.ease || "power3.inOut",
        },
      })
      .addLabel("start", 0)
      .to(
        imgRef.current,
        {
          [isVertical ? "yPercent" : "xPercent"]: 100,
          opacity: 0,
        },
        "start",
      )
      .to(
        imgWrapRef.current,
        {
          [isVertical ? "yPercent" : "xPercent"]: -100,
        },
        "start",
      )
      .to(
        slicesRef.current,
        {
          [isVertical ? "yPercent" : "xPercent"]: (pos: number) =>
            pos % 2 ? gsap.utils.random(-75, 25) : gsap.utils.random(25, 75),
        },
        "start",
      )
  }

  // Split text into spans
  const splitText = (element: HTMLElement) => {
    const text = element.textContent || ""
    const chars = text.split("")

    element.innerHTML = chars.map((char) => `<span class="char" data-initial="${char}">${char}</span>`).join("")
  }

  // Shuffle characters animation
  const shuffleChars = (element: HTMLElement | null) => {
    if (!element) return

    const chars = element.querySelectorAll(".char")

    chars.forEach((char, position) => {
      gsap.killTweensOf(char)
      gsap.fromTo(
        char,
        { opacity: 0 },
        {
          duration: 0.03,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          repeat: 3,
          repeatRefresh: true,
          opacity: 1,
          repeatDelay: 0.05,
          onComplete: () => {
            gsap.set(char, {
              innerHTML: (char as HTMLElement).dataset.initial,
              delay: 0.03,
            })
          },
        },
      )
    })
  }

  return (
    <article
      ref={cardRef}
      className={`card relative min-h-[60vh] p-[4vw] overflow-hidden border-b border-[rgba(177,177,177,0.3)] cursor-pointer ${
        isMiddleColumn ? "border-x border-[rgba(177,177,177,0.3)]" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={imgRef}
        className="card__img absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-0"
        style={{ "--columns": "0", "--rows": "0" } as React.CSSProperties}
      >
        <div ref={imgWrapRef} className="card__img-wrap absolute top-0 left-0 w-full h-full overflow-hidden"></div>
      </div>

      <span
        ref={dateRef}
        className="card__date flex items-center relative before:content-[''] before:w-[15px] before:h-[15px] before:border before:border-[rgb(124,20,244,0.9)] before:bg-[rgb(96,56,178,0.48)] before:mr-[10px] before:mb-1"
      >
        {card.date}
      </span>

      <h2 ref={titleRef} className="card__title font-normal text-[clamp(1.5rem,5vw,2.5rem)]">
        {card.title}
      </h2>

      <a
        ref={linkRef}
        href={card.link}
        className="card__link relative text-[rgb(124,20,244,0.9)] hover:text-[rgb(94,54,176,0.75)] before:content-['+'] before:mr-[10px]"
      >
        Read the article
      </a>
    </article>
  )
}
