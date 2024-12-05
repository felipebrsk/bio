import { CommandHandler } from '@/types'

import { projects, socials } from './data'

export const helpHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()
  setOutput((prev) => [
    ...prev,
    { message: 'Available commands:', timestamp },
    ...[
      '- help: Show all available commands',
      '- projects: Display projects',
      '- socials: Display social media links',
      '- contact: Show contact information',
      '- clear: Clear the terminal',
      '- history: Show command history',
      '- theme [name]: Change the theme',
      '- download resume: Download resume',
      '- whoami: Show a brief introduction',
      '- skills: Display skills and stacks',
      '- joke: Fetch a random joke',
      '- 01101101 01100001 01110100 01110010 01101001 01111000: Neo?',
    ].map((message) => ({ message, timestamp })),
  ])
}

export const clearHandler: CommandHandler = (setOutput) => {
  setOutput([])
}

export const historyHandler: CommandHandler = (setOutput, _, history) => {
  const timestamp = new Date().toLocaleString()
  setOutput((prev) => [
    ...prev,
    { message: 'Command History:', timestamp },
    ...history.map((command) => ({ message: command, timestamp })),
  ])
}

export const socialsHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()
  setOutput((prev) => [
    ...prev,
    { message: 'Social Media Links:', timestamp },
    ...Object.entries(socials).map(([name, url]) => ({
      message: `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${name}</a>`,
      timestamp,
    })),
  ])
}

export const projectsHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()
  setOutput((prev) => [
    ...prev,
    { message: 'Projects:', timestamp },
    ...projects.flatMap((project) => [
      { message: `- ${project.name}:`, timestamp },
      {
        message: `  Repository: <a href="${project.repo}" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">${project.repo}</a>`,
        timestamp,
      },
      project.live
        ? {
            message: `  Live Preview: <a href="${project.live}" rel="noopener noreferrer" target="_blank" class="text-blue-400 underline">${project.live}</a>`,
            timestamp,
          }
        : {
            message:
              '  Live Preview: <span class="text-gray-500">Unavailable</span>',
            timestamp,
          },
    ]),
  ])
}

export const whoamiHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()
  setOutput((prev) => [
    ...prev,
    {
      message: `Hello! Nice to meet you. My name is Felipe, a Software Engineer with more than five years of experience.<br />
                I'm currently working with Laravel, building scalable applications with Clean Architecture, SOLID, cloud solutions (AWS), SOA/Microservices, etc.<br />
                If you want to know more, feel free to type \`skills\` or \`download resume\`. Thank you for visiting!`,
      timestamp,
    },
  ])
}

export const skillsHandler: CommandHandler = (setOutput) => {
  const skills = [
    'PHP/Laravel (5 years)',
    'AWS (4 years)',
    'Docker (4 years)',
    'SQL Server, MySQL, PostgreSQL, SQLite (5 years)',
    'Redis, Firebase, Firestore (5 years)',
    'React/TypeScript (3 years)',
    'Next/TypeScript (3 years)',
    'Pipelines, CI/CD, Github Actions (4 years)',
    'Redux, RTK Query (3 years)',
    'Laravel Ecosystem (professional background experience): Forge, Horizon, Octane, Livewire, Vapor, Echo, Reverb, Cashier, Dusk, Pint, Pulse, Sail, Socialite',
    'GoLang (1 year)',
    'Clean/Hexagonal Architecture (3 years)',
    'System Design, Database Design (2 years)',
    'RabbitMQ, Kafka (1 year)',
    'NodeJS (1 year)',
    'Python, Selenium, E2E (1 year)',
    'Tailwind (4 years)',
    'Java, SpringBoot (1 year)',
    'Kibana, Grafana, Pulse (3 years)',
    'VueJS (1 year)',
    'Elixir (less than 1 year)',
  ]
  const timestamp = new Date().toLocaleString()
  setOutput((prev) => [
    ...prev,
    { message: 'Skills and Stacks:', timestamp },
    ...skills.map((skill) => ({ message: `- ${skill}`, timestamp })),
  ])
}

export const jokeHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then((response) => response.json())
    .then((data) => {
      setOutput((prev) => [
        ...prev,
        { message: `${data.setup} - ${data.punchline}`, timestamp },
      ])
    })
    .catch(() => {
      setOutput((prev) => [
        ...prev,
        {
          message:
            'Oops! Could not fetch a joke right now. Try again later!',
          timestamp,
        },
      ])
    })
}

export const contactHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()
  const contactDetails = [
    { message: 'You can find me on:', timestamp },
    {
      message: `Email: <a href="mailto:felipe.ufs97@gmail.com" class="text-blue-400 underline">felipe.ufs97@gmail.com</a>`,
      timestamp,
    },
    {
      message: `WhatsApp: <a href="https://api.whatsapp.com/send?phone=${encodeURIComponent('+5579998677272')}" class="text-blue-400 underline">Send message</a>`,
      timestamp,
    },
    {
      message: `LinkedIn: <a href="https://linkedin.com/in/felipe-luz-oliveira/" class="text-blue-400 underline">View Profile</a>`,
      timestamp,
    },
  ]
  setOutput((prev) => [...prev, ...contactDetails])
}

export const themeHandler: CommandHandler = (
  setOutput,
  args,
  _,
  setTheme,
) => {
  const theme = args[0]
  const timestamp = new Date().toLocaleString()
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
  if (availableThemes.includes(theme)) {
    setTheme(theme)
    localStorage.setItem('theme', theme)
    setOutput((prev) => [
      ...prev,
      { message: `Theme changed to "${theme}".`, timestamp },
    ])
  } else {
    setOutput((prev) => [
      ...prev,
      {
        message: `Invalid theme. Available themes: ${availableThemes.join(', ')}`,
        timestamp,
      },
    ])
  }
}

export const matrixHandler: CommandHandler = (setOutput) => {
  const timestamp = new Date().toLocaleString()

  {
    setOutput((prev) => [
      ...prev,
      { message: 'Welcome to the Matrix...', timestamp },
    ])

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
          { message: 'You successfully left the Matrix.', timestamp },
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
  }
}
