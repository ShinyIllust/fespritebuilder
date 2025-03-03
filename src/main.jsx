import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ImageSelector from './ImageSelector.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageSelector />
  </StrictMode>,
)
