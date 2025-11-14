import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { ThemeProvider } from './labs/lab4/ThemeContext'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { AuthProvider } from './labs/lab5/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
