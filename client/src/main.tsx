import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Signup from './Signup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Signup />
  </StrictMode>,
)
