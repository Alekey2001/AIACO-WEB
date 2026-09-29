import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { ContentProvider } from './content/ContentContext.jsx'
createRoot(document.getElementById('root')).render(
<StrictMode>
  <AuthProvider>
    <ContentProvider>
      <App />
    </ContentProvider>
  </AuthProvider>
</StrictMode>
)