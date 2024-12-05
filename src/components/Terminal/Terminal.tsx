import { useTerminal } from '@/hooks'

import { Body, Input } from './modules'

function Terminal() {
  const {
    command,
    handleCommand,
    handleInputChange,
    handleKeyDown,
    output,
    setCommand,
    suggestions,
    theme,
    setSuggestions,
  } = useTerminal()

  return (
    <div
      className={`relative bg-black text-white font-mono h-screen overflow-hidden flex flex-col theme-${theme}`}>
      <div className="terminal-window border border-gray-700 rounded-lg shadow-lg flex flex-col flex-grow overflow-hidden">
        <div className="terminal-header bg-gray-800 py-2 px-4 flex justify-between">
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <p>~/portfolio</p>
        </div>
        <Body output={output} />
        <Input
          command={command}
          handleCommand={handleCommand}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          setCommand={setCommand}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
      </div>
    </div>
  )
}

export default Terminal
