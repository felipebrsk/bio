import { CommandHandler } from '@/types'

import {
  helpHandler,
  clearHandler,
  historyHandler,
  socialsHandler,
  projectsHandler,
  whoamiHandler,
  skillsHandler,
  jokeHandler,
  contactHandler,
  themeHandler,
  matrixHandler,
} from './handlers'

export const commandRegistry: Record<string, CommandHandler> = {
  help: helpHandler,
  clear: clearHandler,
  history: historyHandler,
  socials: socialsHandler,
  projects: projectsHandler,
  whoami: whoamiHandler,
  skills: skillsHandler,
  joke: jokeHandler,
  contact: contactHandler,
  theme: themeHandler,
  matrix: matrixHandler,
}
