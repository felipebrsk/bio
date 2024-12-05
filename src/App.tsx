import './styles/global.css'
import 'nprogress/nprogress.css'
import '@fontsource/press-start-2p'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import { HelmetProvider } from 'react-helmet-async'

import { Routes } from './Routes'

function App() {
  return (
    <HelmetProvider>
      <Routes />
    </HelmetProvider>
  )
}

export default App
