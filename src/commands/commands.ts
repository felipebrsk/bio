import { Dispatch, SetStateAction } from 'react'

import resume from '@/assets/Felipe-CV_EN.pdf'

import { commandRegistry } from '@/commands'

export const commands = [
  'help',
  'projects',
  'contact',
  'clear',
  'history',
  'download resume',
  'socials',
  'whoami',
  'stacks',
  'skills',
  'joke',
  'theme dark',
  'theme retro',
  'theme solarized',
  'theme cyberpunk',
  'theme light',
  'theme matrix',
  'theme ocean',
  'theme midnight',
  'theme sunset',
  'theme forest',
  'theme neon',
  'theme vintage',
  'theme space',
  'theme fire',
  'theme ice',
]

export const executeCommand = (
  command: string,
  history: string[],
  setTheme: Dispatch<SetStateAction<string>>,
  setOutput: Dispatch<
    SetStateAction<{ message: string; timestamp: string }[]>
  >,
) => {
  const [baseCommand, ...args] = command.split(' ')
  const handler = commandRegistry[baseCommand.toLowerCase()]

  const timestamp = new Date().toLocaleString()

  if (handler) {
    handler(setOutput, args, history, setTheme)
    return
  }

  if (command.startsWith('theme ')) {
    const themeName = command.split(' ')[1]
    const availableThemes = [
      'dark',
      'retro',
      'solarized',
      'cyberpunk',
      'light',
      'matrix',
      'ocean',
      'midnight',
      'sunset',
      'forest',
      'neon',
      'vintage',
      'space',
      'fire',
      'ice',
    ]

    if (availableThemes.includes(themeName)) {
      setTheme(themeName)
      localStorage.setItem('theme', themeName)
      setOutput((prev) => [
        ...prev,
        { message: `Theme changed to ${themeName}.`, timestamp },
      ])
    } else {
      setOutput((prev) => [
        ...prev,
        {
          message: `Theme not recognized. Available themes: ${availableThemes.join(', ')}.`,
          timestamp,
        },
      ])
    }
  } else if (command.startsWith('download ')) {
    const file = command.split(' ')[1]
    if (file === 'resume') {
      setOutput((prev) => [
        ...prev,
        { message: 'Downloading resume...', timestamp },
      ])
      window.open(resume, '_blank', 'noopener noreferer')
    } else {
      setOutput((prev) => [
        ...prev,
        {
          message: 'Download not recognized. Available options: resume.',
          timestamp,
        },
      ])
    }
  } else {
    setOutput((prev) => [
      ...prev,
      {
        message: `Command not recognized: "${command}". Type \`help\` for options.`,
        timestamp,
      },
    ])
  }
}
