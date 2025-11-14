import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

// Контекст авторизации: хранит пользователя, login/logout и синхронизирует с localStorage
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {

    // состояние авторизации из localStorage при загрузке
    const raw = localStorage.getItem('lab5_auth_user');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.username) setUser(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    // Синхронизация состояния авторизации в localStorage
    if (user) {
      localStorage.setItem('lab5_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lab5_auth_user');
    }
  }, [user]);

  const login = useCallback((username) => {
    // Авторизуем пользователя по имени/email
    setUser({ username });
  }, []);

  const logout = useCallback(() => {
    // Разлогиниваем пользователя
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
