import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Профиль пользователя в шапке: показывает email/логин и кнопку выхода
export default function Profile() {
  const { user, logout } = useContext(AuthContext); // читаем пользователя и экшен выхода
  if (!user) return null; // если не авторизован — ничего не показываем

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontSize: 14, color: 'var(--header-text)' }}>{user.username}</div> {/* email/логин */}
      <button onClick={logout} style={{ fontSize: 12, padding: '6px 10px' }}>Выйти</button> {/* разлогин */}
    </div>
  );
}
