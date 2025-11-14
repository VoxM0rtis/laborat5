import React from 'react';
import Header from './labs/lab3/Header';
import Footer from './labs/lab3/Footer';
import Menu from './labs/lab3/Menu';
import Content from './labs/lab2/Content';

function App() {
  return (
    // Общий макет страницы: шапка, область с меню и контентом, футер
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Передаем выбранную лабораторную и обработчик выбора в меню */}
        <Menu />
        {/* Передаем выбранную лабораторную в контент для отображения */}
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;