// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { BrowserRouter} from 'react-router-dom';
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider>
    <App />
    </ClerkProvider>
  </StrictMode>,
)