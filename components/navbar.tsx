"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { id: "home", href: "#home", label: "Home" },
  { id: "about", href: "#about", label: "About" },
  { id: "tech", href: "#tech", label: "Tech Stack" },
  { id: "contact", href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.id)
      const scrollPosition = window.scrollY + 200 // Offset để detect section sớm hơn
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Kiểm tra nếu đã scroll gần cuối trang (trong phần contact)
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection("contact")
        return
      }

      // Duyệt ngược từ cuối lên để tìm section đang active
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          
          if (scrollPosition >= elementTop - 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    // Gọi ngay khi component mount để set active section ban đầu
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      // Đặt navbar lên trên các hiệu ứng nền (SnowEffect, 3D, v.v.)
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <a href="#home" className="relative group" aria-label="Go to home">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              LDK
            </span>
            <span className="absolute -inset-2 blur-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 py-2 ${
                    activeSection === link.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-cyan-400 rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-border">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.id}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                  className={`transform transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                >
                  <a
                    href={link.href}
                    className={`block py-3 px-4 rounded-lg transition-all duration-200 ${
                      activeSection === link.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
