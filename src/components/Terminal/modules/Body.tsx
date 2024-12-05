import { useEffect, useRef } from 'react'

interface BodyProps {
  output: string[]
}

function Body({ output }: BodyProps) {
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [output])

  return (
    <div
      ref={terminalBodyRef}
      className="terminal-body flex-grow overflow-y-auto p-4"
      dangerouslySetInnerHTML={{
        __html: output.map((line) => `<div>${line}</div>`).join(''),
      }}
    />
  )
}

export default Body
