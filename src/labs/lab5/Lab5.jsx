import React, { useState } from 'react';
import useLoginState from './useLoginState';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Feedback from './Feedback';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Container from '../lab3/Container';

// Основной экран лабораторной 5: показывает формы входа/регистрации или контент после авторизации
export default function Lab5() {
  const isLoggedIn = useLoginState(); // статус авторизации
  const { login } = useContext(AuthContext); // экшен для логина
  const [mode, setMode] = useState('login'); // переключение между "Вход" и "Регистрация"

  if (!isLoggedIn) {
    return (
      <Container>
        <div style={{ display: 'grid', gap: 16, maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* вкладки форм */}
            <button onClick={() => setMode('login')} disabled={mode === 'login'}>Вход</button>
            <button onClick={() => setMode('register')} disabled={mode === 'register'}>Регистрация</button>
          </div>
          {mode === 'login' ? (
            <LoginForm /> // форма авторизации
          ) : (
            // после регистрации сразу авторизуем по email
            <RegisterForm onRegistered={({ email }) => { login(email); }} />
          )}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ display: 'grid', gap: 24 }}>
        <div>Вы авторизованы. Ниже форма обратной связи и список отзывов.</div>
        <Feedback /> {/* форма отзыва и список */}
      </div>
    </Container>
  );
}
