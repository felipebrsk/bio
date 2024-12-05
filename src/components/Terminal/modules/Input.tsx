import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'

interface InputProps {
  command: string
  suggestions: string[]
  handleCommand: (e: FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  setCommand: (value: string) => void
  setSuggestions: Dispatch<SetStateAction<string[]>>
}

function Input({
  command,
  suggestions,
  handleCommand,
  handleInputChange,
  handleKeyDown,
  setCommand,
  setSuggestions,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={handleCommand}
      className="bg-gray-900 p-2 flex w-full relative">
      <span className="text-white">$</span>
      <input
        ref={inputRef}
        type="text"
        value={command}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent outline-none border-none flex-grow ml-2 placeholder-gray-500 w-full"
        placeholder="Type a command..."
      />
      {suggestions.length > 0 && (
        <div className="absolute left-6 bottom-full mb-2 bg-gray-800 border border-gray-700 rounded-md p-2 z-50 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            const matchIndex = suggestion
              .toLowerCase()
              .indexOf(command.toLowerCase())

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                className="cursor-pointer hover:bg-gray-700 px-2 py-1"
                onClick={() => {
                  setCommand(suggestion)
                  setSuggestions([])
                  inputRef.current?.focus()
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCommand(suggestion)
                    setSuggestions([])
                    inputRef.current?.focus()
                  }
                }}>
                {suggestion.slice(0, matchIndex)}
                <span className="suggestion-highlight">
                  {suggestion.slice(
                    matchIndex,
                    matchIndex + command.length,
                  )}
                </span>
                {suggestion.slice(matchIndex + command.length)}
              </div>
            )
          })}
        </div>
      )}
    </form>
  )
}

export default Input
