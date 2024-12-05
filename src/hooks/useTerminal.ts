import { useRef, useState } from 'react'

import { commands, executeCommand } from '@/components/Terminal/modules'

function useTerminal() {
  const historyIndexRef = useRef<number>(-1)
  const [theme, setTheme] = useState<string>('dark')
  const [command, setCommand] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [output, setOutput] = useState<string[]>([
    'Type `help` to get started...',
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCommand(value)

    if (value) {
      const filteredSuggestions = commands.filter((cmd) =>
        cmd.startsWith(value),
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault()
      setCommand(suggestions[0])
      setSuggestions([])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        if (historyIndexRef.current < history.length - 1) {
          historyIndexRef.current++
          const newCommand =
            history[history.length - 1 - historyIndexRef.current]
          setCommand(newCommand)
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndexRef.current > 0) {
        historyIndexRef.current--
        const newCommand =
          history[history.length - 1 - historyIndexRef.current]
        setCommand(newCommand)
      } else if (historyIndexRef.current === 0) {
        historyIndexRef.current = -1
        setCommand('')
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      setOutput([])
    }
  }

  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOutput((prev) => [...prev, `> ${command}`])
    setHistory((prev) => [...prev, command])
    executeCommand(command, history, setTheme, setOutput)
    setCommand('')
    setSuggestions([])
  }

  return {
    theme,
    output,
    command,
    suggestions,
    handleCommand,
    handleInputChange,
    handleKeyDown,
    setCommand,
    setSuggestions,
  }
}

export default useTerminal
