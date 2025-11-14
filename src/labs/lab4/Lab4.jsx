import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import Container from '../lab3/Container';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../../store/index.js';

// Компонент-переключатель темы из контекста
function ThemeToggle() {
  // useTheme: доступ к текущей теме и переключателю
  const { theme, toggleTheme } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        margin: '16px 0',
      }}
    >
      <span style={{ fontSize: 16, marginRight: 4 }}>Текущая тема:</span>
      <button
        onClick={toggleTheme}
        aria-label="Переключить тему"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: 16,
          padding: 0,
          textDecoration: 'underline',
        }}
      >
        {theme === 'light' ? <b>День 🌞</b> : <b>Ночь 🌙</b>}
      </button>
    </div>
  );
}

// Счетчик из Redux + синхронизация заголовка вкладки через useEffect
function Counter() {
  // useSelector: берем значение счетчика из Redux
  const count = useSelector((state) => state.counter.value);
  // useDispatch: получаем функцию для отправки actions
  const dispatch = useDispatch();

  // Обновляем title при каждом изменении count
  useEffect(() => {
    document.title = `Счетчик: ${count}`;
  }, [count]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span>Значение: {count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Сброс</button>
    </div>
  );
}

// Секундомер демонстрирует эффекты при монтировании и очистку при размонтировании
function Ticker() {
  // useState: секунды, увеличиваются каждую секунду
  const [sec, setSec] = useState(0);

  // Запускаем интервал и очищаем его при размонтировании
  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <div>Секундомер: {sec} c</div>;
}

// Объединяет контекст темы, Redux-счетчик и секундомер
export default function Lab4() {
  // useState: состояние видимости секундомера
  const [showTicker, setShowTicker] = useState(true);

  return (
    <section className="lab4-wrap">
      <h2 style={{ textAlign: 'center' }}>Лабораторная 4: Переключение темы (Context)</h2>
      <ThemeToggle />
      <Container>
        <h3 style={{ marginTop: 20 }}>useState и useEffect</h3>
        <Counter />
        <h3 style={{ marginTop: 20 }}>useEffect на монтировании и при размонтировании</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setShowTicker((v) => !v)}>
            {showTicker ? 'Скрыть секундомер' : 'Показать секундомер'}
          </button>
          {showTicker && <Ticker />}
        </div>
      </Container>
    </section>
  );
}
