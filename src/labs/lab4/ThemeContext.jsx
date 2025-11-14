import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Контекст темы: хранит текущую тему ('light' или 'dark') и функцию переключения
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  // Определяем начальную тему: localStorage -> системная настройка -> 'light'
  const getInitial = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  // useState: хранит текущую тему
  const [theme, setTheme] = useState(getInitial);

  // Синхронизируем тему с DOM (атрибут data-theme) и сохраняем в localStorage
  // useEffect: применяет тему в DOM и пишет в localStorage при изменении
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // useMemo: кеширует объект value при неизменной теме
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  // Хук-обертка для удобного доступа к контексту темы
  // useContext: достаёт value из ThemeContext
  return useContext(ThemeContext);
}
