import { Dispatch, SetStateAction } from 'react'

import resume from '@/assets/Felipe-CV_EN.pdf'

import { projects, socials } from './data'

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

export function executeCommand(
  command: string,
  history: string[],
  setTheme: Dispatch<SetStateAction<string>>,
  setOutput: Dispatch<SetStateAction<string[]>>,
) {
  switch (command.toLowerCase()) {
    case 'help':
      setOutput((prev) => [
        ...prev,
        'Available commands:',
        '- projects: Show the projects section',
        '- socials: Show links to social media accounts',
        '- contact: Show the contact section',
        '- clear: Clear the terminal',
        '- history: Show command history',
        '- theme [dark|retro|solarized|cyberpunk|light|matrix|ocean|midnight|sunset|forest|neon|vintage|space|fire|ice]: Change the terminal theme',
        '- download [resume]: Download assets',
        '- whoami: Discover who am I',
        '- stacks: Check all my stacks or skills',
        '- skills: Check all my stacks or skills',
        '- joke: Sometimes you need to light up your day. Try it!',
        '- 01101101 01100001 01110100 01110010 01101001 01111000: Neo?',
      ])
      break
    case 'clear':
      setOutput([])
      break
    case 'history':
      setOutput((prev) => [...prev, ...history])
      break
    case 'socials':
      setOutput((prev) => [
        ...prev,
        'Social Media Links:',
        ...Object.entries(socials).map(
          ([name, url]) =>
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${name}</a>`,
        ),
      ])
      break
    case 'projects':
      setOutput((prev) => [
        ...prev,
        'Projects:',
        ...projects.flatMap((project) => [
          `- ${project.name}:`,
          `  Repository: <a href="${project.repo}" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">${project.repo}</a>`,
          project.live
            ? `  Live Preview: <a href="${project.live}" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">${project.live}</a>`
            : '  Live Preview: <span class="text-gray-500">Unavailable</span>',
        ]),
      ])
      break
    case 'whoami':
      setOutput((prev) => [
        ...prev,
        `Hello! Nice to meet you. My name is Felipe, a Software Engineer with more than five years of experience.<br />
            I'm currently working with Laravel, building scalable applications with Clean Architecture, SOLID, cloud solutions (AWS), SOA/Microservices etc.<br />
            If you want to know more, feel free to type \`skills\` or \`stacks\`, or \`download resume\`. Thank you for visiting!
            `,
      ])
      break
    case 'matrix': {
      setOutput((prev) => [...prev, 'Welcome to the Matrix...'])

      const createMatrixRain = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        document.body.appendChild(canvas)

        canvas.style.position = 'fixed'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.zIndex = '1000'
        canvas.style.background = 'black'

        const stopButton = document.createElement('button')
        stopButton.innerText = 'Leave Matrix'
        stopButton.style.position = 'fixed'
        stopButton.style.top = '10px'
        stopButton.style.right = '10px'
        stopButton.style.zIndex = '1001'
        stopButton.style.padding = '10px 20px'
        stopButton.style.fontSize = '16px'
        stopButton.style.color = '#fff'
        stopButton.style.background = '#333'
        stopButton.style.border = 'none'
        stopButton.style.borderRadius = '5px'
        stopButton.style.cursor = 'pointer'
        document.body.appendChild(stopButton)

        const resizeCanvas = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const fontSize = 16
        const columns = Math.floor(canvas.width / fontSize)
        const drops = Array(columns).fill(0)

        const drawMatrix = () => {
          if (!ctx) return

          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          ctx.fillStyle = '#0F0'
          ctx.font = `${fontSize}px monospace`

          for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0'
            const x = i * fontSize
            const y = drops[i] * fontSize

            ctx.fillText(text, x, y)

            if (y > canvas.height && Math.random() > 0.975) {
              drops[i] = 0
            }

            drops[i]++
          }
        }

        const interval = setInterval(drawMatrix, 50)

        stopButton.addEventListener('click', () => {
          clearInterval(interval)
          window.removeEventListener('resize', resizeCanvas)
          document.body.removeChild(canvas)
          document.body.removeChild(stopButton)
          setOutput((prev) => [
            ...prev,
            'You successfully left the Matrix.',
          ])
        })

        return () => {
          clearInterval(interval)
          window.removeEventListener('resize', resizeCanvas)
          document.body.removeChild(canvas)
          document.body.removeChild(stopButton)
        }
      }

      createMatrixRain()
      break
    }
    case 'stacks':
    case 'skills':
      setOutput((prev) => [
        ...prev,
        `
        - PHP/Laravel (5 years)<br />
        - AWS (4 years)<br />
        - Docker (4 years)<br />
        - SQL Server, MySQL, PostgreSQL, SQLite (5 years)<br />
        - Redis, Firebase, Firestore (5 years)<br />
        - React/TypeScript (3 years)<br />
        - Next/TypeScript (3 years)<br />
        - Pipelines, CI/CD, Github Actions (4 years)<br />
        - Redux, RTK Query (3 years)<br />
        - Laravel Ecosystem (professional background experience): Forge, Horizon, Octane, Livewire, Vapor, Echo, Reverb, Cashier, Dusk, Pint, Pulse, Sail, Socialite<br />
        - GoLang (1 year)<br />
        - Clean/Hexagonal Architecture (3 years)<br />
        - System Design, Database Design (2 years)<br />
        - RabbitMQ, Kafka (1 year)<br />
        - NodeJS (1 year)<br />
        - Python, Selenium, E2E (1 year)<br />
        - Tailwind (4 years)<br />
        - Java, SpringBoot (1 year)<br />
        - Kibana, Grafana, Pulse (3 years)<br />
        - VueJS (1 year)<br />
        - Elixir (less than 1 year)
      `,
      ])
      break
    case 'joke':
      fetch('https://official-joke-api.appspot.com/random_joke')
        .then((response) => response.json())
        .then((data) => {
          setOutput((prev) => [
            ...prev,
            `${data.setup} - ${data.punchline}`,
          ])
        })
        .catch(() => {
          setOutput((prev) => [
            ...prev,
            'Oops! Could not fetch a joke right now. Try again later!',
          ])
        })
      break
    case 'contact':
      setOutput((prev) => [
        ...prev,
        `
        You can find my on:<br />
        Email: <a href="mailto:felipe.ufs97@gmail.com" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">felipe.ufs97@gmail.com</a><br />
        WhatsApp: <a href="https://api.whatsapp.com/send?phone=${encodeURIComponent('+5579998677272')}&text=${encodeURIComponent('Hello, I found you on your Portfolio.')}" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">Send message</a><br />
        Linkedin: <a href="https://linkedin.com/in/felipe-luz-oliveira/" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">Go to Linkedin</a>
        `,
      ])
      break
    default:
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
          setOutput((prev) => [...prev, `Theme changed to ${themeName}.`])
        } else {
          setOutput((prev) => [
            ...prev,
            `Theme not recognized. Available themes: ${availableThemes.join(', ')}.`,
          ])
        }
      } else if (command.startsWith('download ')) {
        const file = command.split(' ')[1]
        if (file === 'resume') {
          setOutput((prev) => [...prev, 'Downloading resume...'])
          window.open(resume, '_blank', 'noopener noreferer')
        } else {
          setOutput((prev) => [
            ...prev,
            'Download not recognized. Available options: resume.',
          ])
        }
      } else {
        setOutput((prev) => [
          ...prev,
          `Command not recognized: "${command}". Type \`help\` for options.`,
        ])
      }
  }
}
