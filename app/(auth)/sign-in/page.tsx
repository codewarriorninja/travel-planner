"use client"

import { loginwithGithub, loginwithGoogle } from '@/lib/auth'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SignIn = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentDestination, setCurrentDestination] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const destinations = [
    { name: "Santorini", emoji: "🏛️", bg: "from-blue-400 to-purple-500" },
    { name: "Tokyo", emoji: "🏯", bg: "from-pink-400 to-red-500" },
    { name: "Bali", emoji: "🌺", bg: "from-green-400 to-blue-500" },
    { name: "Paris", emoji: "🗼", bg: "from-yellow-400 to-pink-500" },
    { name: "Iceland", emoji: "🏔️", bg: "from-cyan-400 to-blue-600" }
  ]

  useEffect(() => {
    if (status === 'loading') return 
    if (session) {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (status === 'loading') {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping'></div>
          <div className='absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-300'></div>
          <div className='absolute bottom-1/4 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700'></div>
          <div className='absolute top-1/2 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1000'></div>
        </div>
        
        <div className='text-center'>
          <div className='relative mb-8'>
            <div className='w-16 h-16 border-4 border-white/20 rounded-full animate-spin'></div>
            <div className='absolute inset-0 w-16 h-16 border-4 border-t-white rounded-full animate-spin'></div>
          </div>
          <p className='text-white text-xl font-light tracking-wide'>Charting your course...</p>
        </div>
      </div>
    )
  }

  if (session) {
    return null
  }

  return (
    <div className='min-h-screen bg-black text-white relative overflow-hidden'>
      {/* Animated starfield background */}
      <div className='absolute inset-0'>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-white rounded-full animate-pulse'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Dynamic destination background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${destinations[currentDestination].bg} opacity-10 transition-all duration-1000`}
      />

      <div className='relative z-10 min-h-screen flex flex-col lg:flex-row'>
        {/* Left side - Destination showcase */}
        <div className='flex-1 flex flex-col justify-center items-center p-4 sm:p-8 relative min-h-[40vh] lg:min-h-screen'>
          <div className='text-center'>
            <div className='relative mb-6 lg:mb-8'>
              <div className='text-4xl sm:text-6xl lg:text-8xl mb-2 sm:mb-4 transform transition-transform duration-500 hover:scale-110'>
                {destinations[currentDestination].emoji}
              </div>
              <h1 className='text-2xl sm:text-4xl lg:text-6xl font-thin mb-2 sm:mb-4 tracking-wider'>
                {destinations[currentDestination].name}
              </h1>
              <div className='w-16 sm:w-24 lg:w-32 h-0.5 bg-white/50 mx-auto mb-4 sm:mb-6 lg:mb-8'></div>
            </div>
            
            <div className='flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8'>
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDestination(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentDestination ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <p className='text-sm sm:text-lg lg:text-xl font-light text-white/80 max-w-xs sm:max-w-md mx-auto leading-relaxed px-4'>
              Every journey begins with a single step. Let&apos;s take yours together.
            </p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className='flex-1 flex items-center justify-center p-4 sm:p-8 lg:min-h-screen'>
          <div className='w-full max-w-sm sm:max-w-md'>
            {/* Floating login card */}
            <div 
              className={`relative transform transition-all duration-700 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glowing border effect */}
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse'></div>
              
              <div className='relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 p-4 sm:p-6 lg:p-8 shadow-2xl'>
                {/* Header */}
                <div className='text-center mb-6 sm:mb-8'>
                  <div className='w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur-md opacity-50'></div>
                    <div className='relative bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center h-full backdrop-blur-sm'>
                      <svg className='w-6 h-6 sm:w-8 sm:h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                      </svg>
                    </div>
                  </div>
                  <h2 className='text-xl sm:text-2xl font-light mb-2 tracking-wide'>Welcome Traveler</h2>
                  <p className='text-white/70 text-xs sm:text-sm'>Begin your adventure</p>
                </div>

                {/* Login buttons */}
                <div className='space-y-3 sm:space-y-4'>
                  <button
                    onClick={loginwithGithub}
                    className='group relative w-full p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
                    <div className='relative flex items-center justify-center gap-2 sm:gap-3'>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span className='font-medium text-sm sm:text-base'>Continue with GitHub</span>
                    </div>
                  </button>

                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-white/20'></div>
                    </div>
                    <div className='relative flex justify-center text-xs sm:text-sm'>
                      <span className='px-3 sm:px-4 bg-black text-white/60'>or</span>
                    </div>
                  </div>

                  <button
                    onClick={loginwithGoogle}
                    className='group relative w-full p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
                    <div className='relative flex items-center justify-center gap-2 sm:gap-3'>
                      <svg className='w-4 h-4 sm:w-5 sm:h-5' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='#4285F4'/>
                        <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853'/>
                        <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='#FBBC05'/>
                        <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335'/>
                      </svg>
                      <span className='font-medium text-sm sm:text-base'>Continue with Google</span>
                    </div>
                  </button>
                </div>

                {/* Features */}
                <div className='mt-6 sm:mt-8 space-y-2 sm:space-y-3'>
                  <div className='text-center text-xs sm:text-sm text-white/60 mb-3 sm:mb-4'>What awaits you:</div>
                  {[
                    { icon: '🎯', text: 'Personalized recommendations' },
                    { icon: '⚡', text: 'Instant trip planning' },
                    { icon: '🤝', text: 'Connect with locals' }
                  ].map((feature, index) => (
                    <div key={index} className='flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80'>
                      <span className='text-base sm:text-lg'>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Terms */}
                <div className='mt-6 sm:mt-8 text-center text-xs text-white/50 leading-relaxed'>
                  By continuing, you agree to our{' '}
                  <Link href='#' className='text-purple-400 hover:text-purple-300 transition-colors underline'>
                    Terms
                  </Link>
                  {' & '}
                  <Link href='#' className='text-purple-400 hover:text-purple-300 transition-colors underline'>
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className='fixed bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 px-4'>
        <Link 
          href='/' 
          className='flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm bg-black/20 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-white/20 hover:border-white/40'
        >
          <span>Explore without account</span>
          <svg className='w-3 h-3 sm:w-4 sm:h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default SignIn