import { Dispatch, SetStateAction } from 'react'

export type CommandHandler = (
  setOutput: Dispatch<
    SetStateAction<{ message: string; timestamp: string }[]>
  >,
  args: string[],
  history: string[],
  setTheme: Dispatch<SetStateAction<string>>,
) => void
