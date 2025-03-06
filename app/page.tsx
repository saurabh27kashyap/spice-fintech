"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Users, BarChart3, Gift, Download, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Animation helper component
const AnimatedElement = ({ children, delay = 0, className = "", animation = "fade-up" }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const animationClasses = {
    "fade-up": `transition-all duration-700 ease-out transform ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    }`,
    "fade-in": `transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`,
    "scale-up": `transition-all duration-700 ease-out transform ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`,
    "slide-right": `transition-all duration-700 ease-out transform ${
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
    }`,
    "slide-left": `transition-all duration-700 ease-out transform ${
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
    }`,
  }

  const style = { transitionDelay: `${delay}ms` }

  return (
    <div ref={ref} className={`${animationClasses[animation]} ${className}`} style={style}>
      {children}
    </div>
  )
}

// Smooth scroll function
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export default function Home() {
  // State for floating elements animation
  const [floatingOffset, setFloatingOffset] = useState(0)

  // Floating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingOffset((prev) => (prev + 1) % 100)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Floating style for decorative elements
  const getFloatingStyle = (multiplier = 1, phase = 0) => {
    const offset = Math.sin((floatingOffset + phase) * 0.05) * 5 * multiplier
    return {
      transform: `translateY(${offset}px)`,
      transition: "transform 0.1s ease-out",
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-24 h-24 rounded-full bg-emerald-500/10 blur-3xl"
          style={getFloatingStyle(1.5, 20)}
        ></div>
        <div
          className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl"
          style={getFloatingStyle(1, 50)}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl"
          style={getFloatingStyle(0.8, 70)}
        ></div>
      </div>

      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-TkrvbpIdOu7JQHtYKekyycNnHvh98e.jpeg"
              alt="Spice Logo"
              width={40}
              height={40}
              className="rounded-full relative"
            />
          </div>
          <span className="text-2xl font-bold">Spice</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("features")
            }}
            className="hover:text-emerald-400 transition-colors relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("how-it-works")
            }}
            className="hover:text-emerald-400 transition-colors relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#rewards"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("rewards")
            }}
            className="hover:text-emerald-400 transition-colors relative group"
          >
            Rewards
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#download"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("download")
            }}
            className="hover:text-emerald-400 transition-colors relative group"
          >
            Download
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full relative overflow-hidden group"
          onClick={() => scrollToSection("download")}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">Get Started</span>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative">
        <AnimatedElement animation="slide-right" className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Split Bills, <span className="text-emerald-400">Not Friendships</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Spice makes expense sharing effortless for college students and young adults. Split bills, track expenses,
            and earn rewards - all in one app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=in.spiceclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full h-14 px-8 text-lg flex items-center gap-2 relative overflow-hidden group w-full">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Download size={20} className="relative z-10" />
                <span className="relative z-10">Download Now</span>
              </Button>
            </a>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 rounded-full h-14 px-8 text-lg relative overflow-hidden group"
              onClick={() => scrollToSection("features")}
            >
              <span className="absolute inset-0 w-full h-full bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Learn More</span>
            </Button>
          </div>
        </AnimatedElement>
        <div className="md:w-1/2 relative">
          <AnimatedElement animation="fade-in" delay={300} className="relative z-10 ml-auto w-[280px] md:w-[320px]">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sp1.jpg-dciR6g12oiZybO6g0NwcD7Vvsd7bBs.jpeg"
                alt="Spice App Interface"
                width={320}
                height={650}
                className="rounded-3xl shadow-2xl border border-gray-800 relative"
              />
            </div>
          </AnimatedElement>
          <AnimatedElement
            animation="fade-in"
            delay={600}
            className="absolute top-20 -left-4 md:left-20 w-[280px] md:w-[320px] z-0 opacity-80"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sp2.jpg-HTHydAY1P0td0IWq57LUH0dvONirce.jpeg"
              alt="Spice Rewards Interface"
              width={320}
              height={650}
              className="rounded-3xl shadow-2xl border border-gray-800"
            />
          </AnimatedElement>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-emerald-400">Spice</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Designed specifically for Indian college students and young adults, Spice makes managing shared expenses
              simple and rewarding.
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <AnimatedElement delay={100} animation="scale-up">
              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-emerald-500 transition-all hover:shadow-emerald-500/20 hover:shadow-lg h-full group">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-all duration-300 transform group-hover:scale-110">
                  <Users className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Split it</h3>
                <p className="text-gray-300">
                  Effortlessly split bills among friends with equal, percentage, or custom splits. No more awkward money
                  conversations.
                </p>
              </div>
            </AnimatedElement>

            {/* Feature 2 */}
            <AnimatedElement delay={200} animation="scale-up">
              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-emerald-500 transition-all hover:shadow-emerald-500/20 hover:shadow-lg h-full group">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-all duration-300 transform group-hover:scale-110">
                  <BarChart3 className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-Time Tracking</h3>
                <p className="text-gray-300">
                  Monitor shared expenses and balances in real-time. Always know who owes what with clear, transparent
                  tracking.
                </p>
              </div>
            </AnimatedElement>

            {/* Feature 3 */}
            <AnimatedElement delay={300} animation="scale-up">
              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-emerald-500 transition-all hover:shadow-emerald-500/20 hover:shadow-lg h-full group">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-all duration-300 transform group-hover:scale-110">
                  <Gift className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Spice Club Rewards</h3>
                <p className="text-gray-300">
                  Earn "Spice Coins" for every transaction. Redeem for exclusive discounts and exciting benefits.
                </p>
              </div>
            </AnimatedElement>

            {/* Feature 4 */}
            <AnimatedElement delay={400} animation="scale-up">
              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-emerald-500 transition-all hover:shadow-emerald-500/20 hover:shadow-lg h-full group">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-all duration-300 transform group-hover:scale-110">
                  <Smartphone className="text-emerald-500" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">User-Friendly Design</h3>
                <p className="text-gray-300">
                  Intuitive interface designed for seamless navigation. Split expenses with just a few taps.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How <span className="text-emerald-400">Spice</span> Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Getting started with Spice is quick and easy. Here's how to manage your shared expenses in just a few
              steps.
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <AnimatedElement delay={100} animation="fade-up">
              <div className="relative">
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 h-full hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/20 hover:shadow-lg">
                  <div className="absolute -top-5 -left-5 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Create or Join a Group</h3>
                  <p className="text-gray-300 mb-4">
                    Just tap "Add Group", enter a name, and invite your friends. Perfect for trips, roommates, or any
                    shared expenses.
                  </p>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-emerald-400/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sp3.jpg-IU2XusBAwWoWfUFukVS85QsC6Epjss.jpeg"
                      alt="Create Group Interface"
                      width={250}
                      height={500}
                      className="rounded-xl mx-auto shadow-lg border border-gray-800 relative"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Step 2 */}
            <AnimatedElement delay={200} animation="fade-up">
              <div className="relative">
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 h-full hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/20 hover:shadow-lg">
                  <div className="absolute -top-5 -left-5 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Add Expenses & Split</h3>
                  <p className="text-gray-300 mb-4">
                    Tap "Add Expense", enter the amount, select who's involved, and choose how to split. It's that
                    simple!
                  </p>
                  <div className="flex justify-center">
                    <div className="w-[250px] relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-emerald-400/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sp1.jpg-dciR6g12oiZybO6g0NwcD7Vvsd7bBs.jpeg"
                        alt="Add Expense Interface"
                        width={250}
                        height={500}
                        className="rounded-xl shadow-lg border border-gray-800 relative"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Step 3 */}
            <AnimatedElement delay={300} animation="fade-up">
              <div className="relative">
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 h-full hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/20 hover:shadow-lg">
                  <div className="absolute -top-5 -left-5 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-4">Track & Earn Rewards</h3>
                  <p className="text-gray-300 mb-4">
                    Watch your balances update instantly and collect Spice Coins with every action. Redeem them for cool
                    rewards!
                  </p>
                  <div className="flex justify-center">
                    <div className="w-[250px] relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-emerald-400/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sp2.jpg-HTHydAY1P0td0IWq57LUH0dvONirce.jpeg"
                        alt="Rewards Interface"
                        width={250}
                        height={500}
                        className="rounded-xl shadow-lg border border-gray-800 relative"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="bg-gradient-to-b from-black to-gray-900 py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <AnimatedElement animation="slide-right" className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Earn While You Split with <span className="text-emerald-400">Spice Club</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Every time you use Spice, you earn Spice Coins that can be redeemed for exclusive rewards and discounts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight size={16} />
                  </div>
                  <p className="text-gray-300">Earn coins for adding expenses, settling bills, and inviting friends</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight size={16} />
                  </div>
                  <p className="text-gray-300">Maintain daily streaks to multiply your rewards</p>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight size={16} />
                  </div>
                  <p className="text-gray-300">
                    Redeem coins for discounts at popular brands, food outlets, and entertainment venues
                  </p>
                </li>
              </ul>
              <Button
                className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full relative overflow-hidden group"
                onClick={() => scrollToSection("download")}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">Learn More About Rewards</span>
              </Button>
            </AnimatedElement>
            <AnimatedElement animation="slide-left" delay={300} className="md:w-1/2 flex justify-center">
              <div className="relative w-[300px] h-[600px] bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-2xl group hover:border-emerald-500 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent"></div>
                <div className="p-8 pt-12">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold">Shravani Palve</h3>
                    <p className="text-gray-400">Total Rewards</p>
                    <p className="text-5xl font-bold mt-2 group-hover:text-emerald-400 transition-colors duration-300">
                      4242
                    </p>
                    <p className="text-emerald-500 mt-1">Spice</p>
                    <p className="text-gray-400 mt-4">Daily Streak - 0</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-900/80 p-4 rounded-xl text-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-emerald-500">₹</span>
                      </div>
                      <p>Earning</p>
                    </div>
                    <div className="bg-gray-900/80 p-4 rounded-xl text-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-300">🏪</span>
                      </div>
                      <p>Store</p>
                    </div>
                    <div className="bg-gray-900/80 p-4 rounded-xl text-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-emerald-500">🎯</span>
                      </div>
                      <p>Experience</p>
                    </div>
                    <div className="bg-gray-900/80 p-4 rounded-xl text-center hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-red-400">🎁</span>
                      </div>
                      <p>Giveaway</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-900/60 p-3 rounded-xl flex items-center justify-between hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                      <p>Giveaways</p>
                      <ChevronDown size={20} />
                    </div>
                    <div className="bg-gray-900/60 p-3 rounded-xl flex items-center justify-between hover:bg-gray-900 transition-colors duration-300 cursor-pointer">
                      <p>Coupons & Rewards</p>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="scale-up">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-900/40 to-emerald-600/40 rounded-3xl p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-emerald-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Simplify Your Shared Expenses?</h2>
                <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                  Join thousands of Indian college students and young adults who are already enjoying hassle-free
                  expense splitting with Spice.
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=in.spiceclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Download size={24} className="relative z-10" />
                  <span className="relative z-10">Download Spice Now</span>
                </a>
                <p className="mt-4 text-gray-400">Available on Google Play Store</p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Got questions? We've got answers.</p>
          </AnimatedElement>

          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedElement delay={100} animation="fade-up">
              <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/10 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-3">Is Spice free to use?</h3>
                <p className="text-gray-300">
                  Yes, Spice is completely free to download and use. There are no hidden charges or subscription fees.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200} animation="fade-up">
              <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/10 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-3">How do I split expenses with friends who don't have Spice?</h3>
                <p className="text-gray-300">
                  You can invite friends to join Spice directly from the app. Alternatively, you can still track
                  expenses manually and share the details with them.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300} animation="fade-up">
              <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/10 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-3">How do Spice Coins work?</h3>
                <p className="text-gray-300">
                  Spice Coins are earned through regular app usage - adding expenses, settling bills, and inviting
                  friends. These coins can be redeemed for various rewards and discounts in the Spice Store.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400} animation="fade-up">
              <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-emerald-500 transition-all duration-300 hover:shadow-emerald-500/10 hover:shadow-lg">
                <h3 className="text-xl font-bold mb-3">Is my financial data secure with Spice?</h3>
                <p className="text-gray-300">
                  Absolutely. Spice uses industry-standard encryption to protect your data. We don't store any sensitive
                  banking information and prioritize your privacy and security.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-TkrvbpIdOu7JQHtYKekyycNnHvh98e.jpeg"
                  alt="Spice Logo"
                  width={40}
                  height={40}
                  className="rounded-full relative"
                />
              </div>
              <span className="text-2xl font-bold">Spice</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <Link
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("features")
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("how-it-works")
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#rewards"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("rewards")
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Rewards
              </Link>
              <Link
                href="#download"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection("download")
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Download
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Spice. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

