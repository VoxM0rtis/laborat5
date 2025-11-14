import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Lab2 from './Lab2';
import Lab4 from '../lab4/Lab4';
// Подключаем HTML как сырой текст, чтобы вставить его в iframe
import Lab1Html from '../lab1/Lab1.html?raw';
import Lab5 from '../lab5/Lab5';

// Компонент выводит содержимое выбранной лабораторной работы
// selected — больше не нужен, теперь используем роутинг
function Content() {
  return (
    // Основная область контента
    <main style={{ padding: 16, boxSizing: 'border-box', flex: 1, minHeight: 0 }}>
      <Routes>
        <Route
          path="/lab1"
          element={(
            <div style={{ height: '70vh', border: '1px solid var(--card-border)', borderRadius: 8, overflow: 'hidden' }}>
              <iframe
                title="Лабораторная 1"
                srcDoc={Lab1Html}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          )}
        />
        <Route path="/lab2" element={<Lab2 />} />
        <Route path="/lab4" element={<Lab4 />} />
        <Route path="/lab5" element={<Lab5 />} />
        <Route path="*" element={<Navigate to="/lab2" replace />} />
      </Routes>
    </main>
  );
}

export default Content;


