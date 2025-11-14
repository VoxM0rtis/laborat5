import React from 'react';

// Контейнер для выравнивания и ограничения ширины контента
// Props:
//  - className: дополнительные CSS-классы
//  - children: вложенный контент
const Container = ({ children, className = '' }) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;