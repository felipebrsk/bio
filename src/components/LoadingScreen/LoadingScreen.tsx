import NProgress from 'nprogress'
import { useEffect, useState } from 'react'

function LoadingScreen() {
  const [message, setMessage] = useState<string>(
    'Initializing Portfolio...',
  )

  const messages = ['Loading Assets', 'Setting Up', 'Almost There']

  useEffect(() => {
    NProgress.start()

    const interval = setInterval(() => {
      setMessage(
        (prev) => messages[(messages.indexOf(prev) + 1) % messages.length],
      )
    }, 1000)

    return () => {
      clearInterval(interval)

      NProgress.done()
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative w-full">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-mono mb-4 flex items-center relative gap-1">
          {message}
          <div className="bouncing-loader">
            <div />
            <div />
            <div />
          </div>
        </div>

        <div className="sm:w-64 w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="bg-white h-full animate-loading"
            style={{ width: `${(NProgress.status || 0) * 100}%` }}
          />
        </div>

        <div className="mt-4">
          <img
            src="https://media.tenor.com/ew3Y-rRUYvkAAAAi/mario-64-gangname-style.gif"
            alt="Loading Character"
            className="w-16 h-16"
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
