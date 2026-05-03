import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '~styles/main.scss'
import Root from './modules/pages/Root/Root.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
