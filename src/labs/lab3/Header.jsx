// Компонент шапки страницы
import React from 'react';
import Profile from '../lab5/Profile';

function Header() {
  return (
    <header style={{
      backgroundColor: 'var(--header-bg)',
      color: 'var(--header-text)',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ fontWeight: 700 }}>Лабораторные работы</div>
      <Profile />
    </header>
  );
}

export default Header;
