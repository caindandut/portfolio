"use client"

import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TechSection from "@/components/tech-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

const SnowEffect = dynamic(() => import("@/components/snow-effect"), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SnowEffect />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
