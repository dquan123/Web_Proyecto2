import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() =>
    localStorage.getItem('tema') || 'claro'
  )

  useEffect(() => {
    document.body.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  const toggleTema = () => {
    setTema(t => t === 'claro' ? 'oscuro' : 'claro')
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}