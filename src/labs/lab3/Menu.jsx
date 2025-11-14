import React from 'react';
import { NavLink } from 'react-router-dom';

// Боковое меню: показывает список лабораторных и позволяет выбрать одну из них
function Menu() {
  const items = [
    { id: 'lab1', label: 'Лабораторная 1', to: '/lab1' },
    { id: 'lab2', label: 'Лабораторная 2', to: '/lab2' },
    { id: 'lab4', label: 'Лабораторная 4', to: '/lab4' },
    { id: 'lab5', label: 'Лабораторная 5', to: '/lab5' },
  ];

  return (
    // Область меню слева
    <aside style={{
      width: 240,
      borderRight: '2px solid var(--menu-border)',
      padding: 12,
      boxSizing: 'border-box'
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map(item => (
          <li key={item.id}>
            <NavLink
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--menu-border)',
                background: isActive ? 'var(--menu-active-bg)' : 'var(--menu-bg)',
                color: isActive ? 'var(--menu-active-text)' : 'var(--menu-text)',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                cursor: 'pointer',
                marginBottom: 8
              })}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Menu;

