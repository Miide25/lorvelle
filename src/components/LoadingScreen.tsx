import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <Sparkles className="w-full h-full text-pink-600 animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lorvelle</h1>
        <p className="text-gray-600 mb-8">Beauty. Elegance. You.</p>

        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{Math.round(Math.min(progress, 100))}%</p>
        </div>
      </div>
    </div>
  )
}
