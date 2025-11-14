import React from 'react';
import Navigation from './Navigation';
import Container from '../lab3/Container';
import Button from './Button';

// Лабораторная работа 2: пример React-страницы с навигацией и кнопками
function Lab2() {
  // Обработчик нажатия на кнопку "Hello World"
  const handleHelloClick = () => {
    alert('Hello World!');
  };

  return (
    // Разметка страницы: навигация, контейнер с заголовком и кнопками
    <div className="App">
      <Navigation />
      <Container>
        <h1 className="hello-title">Hello World!</h1>
        <p className="app-description">React-приложение с компонентами.</p>
        {/* Кнопка с алертом и вторичная кнопка для демонстрации стилей */}
        <Button onClick={handleHelloClick}>Нажми меня!</Button>
        <Button variant="secondary">Вторичная кнопка</Button>
      </Container>
    </div>
  );
}

export default Lab2;
