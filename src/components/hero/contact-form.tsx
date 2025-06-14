"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          email: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="my-[10vh] px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-normal mb-4 border-b border-[rgba(177,177,177,0.3)] inline-block pb-2">
            <span className="first-letter:opacity-50">Let&apos;s work</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
    <Input
      id="email"
      name="email"
      type="email"
      required
      value={formData.email}
      onChange={handleInputChange}
      placeholder="your.email@example.com"
      className="flex-1 h-14 text-lg px-6 text-white placeholder:text-white/60 bg-transparent border border-[rgba(177,177,177,0.4)] focus:border-[rgb(124,20,244,0.9)] focus:ring-[rgb(124,20,244,0.3)]"
    />
    <Button
      type="submit"
      disabled={isSubmitting}
      className="h-14 px-6 bg-[rgb(124,20,244,0.9)] hover:bg-[rgb(94,54,176,0.75)] text-white text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          Send
        </div>
      )}
    </Button>
  </div>

  {submitStatus === "success" && (
    <Alert className="bg-green-900/20 border-green-500/50 text-green-400">
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>Message sent successfully! I&apos;ll get back to you within 24 hours.</AlertDescription>
    </Alert>
  )}

  {submitStatus === "error" && (
    <Alert className="bg-red-900/20 border-red-500/50 text-red-400">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Failed to send message. Please try again or contact me directly at ...
      </AlertDescription>
    </Alert>
  )}
</form>

        </div>
    </section>
  )
}
