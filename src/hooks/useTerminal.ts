import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from 'react'

import { commands, executeCommand } from '@/commands'

function useTerminal() {
  const historyIndexRef = useRef<number>(-1)
  const [command, setCommand] = useState<string>('')
  const [history, setHistory] = useState<string[]>(() => {
    const storedHistory = localStorage.getItem('commandHistory')
    return storedHistory ? JSON.parse(storedHistory) : []
  })
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [output, setOutput] = useState<
    { message: string; timestamp: string }[]
  >([
    {
      message: 'Type `help` to get started...',
      timestamp: new Date().toLocaleString(),
    },
  ])
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setCommand(value)

    if (value) {
      const filteredSuggestions = commands.filter((cmd) =>
        cmd.includes(value),
      )
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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

  const handleCommand = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const timestamp = new Date().toLocaleString()
    setOutput((prev) => [...prev, { message: `> ${command}`, timestamp }])
    setHistory((prev) => {
      const updatedHistory = [...prev, command]
      localStorage.setItem(
        'commandHistory',
        JSON.stringify(updatedHistory),
      )
      return updatedHistory
    })
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
