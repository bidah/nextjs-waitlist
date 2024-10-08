'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Please visit your inbox or spam folder and confirm your email to join the waitlist')
        setEmail('')
      } else {
        if(data.error === "Email already exists") {
          setMessage('You are already on the waitlist')
        } else {
          setMessage('An error occurred now. Please try again.')
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="h-dvh p-4 flex bg-white">
      <div className="rounded-3xl  w-full flex flex-col items-center justify-center from-primary/20 to-background p-4 bg-[url('/bg.webp')] bg-cover bg-center">
        <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="absolute top-0 left-0 right-0 w-full p-0">
            <div className="max-w-md mx-auto flex flex-start justify-center">
              <p>Next.js Waitlist </p>
            </div>
          </div>

          {/* Phrase */}
          <h1 className="text-xl md:text-2xl text-center text-black">
            <span className="font-semibold font-varela-round text-black">Your tagline</span><br/> of your app or SAAS app will go here.
          </h1>

          {/* Input and Button */}
          <form onSubmit={handleSubmit} className="flex lg:w-[450px] space-x-2 relative">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white/40 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          {message && <p className="text-sm text-center absolute top-full left-1/2 transform -translate-x-1/2 mt-6 container">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}