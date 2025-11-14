// Нижний колонтитул страницы
import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--footer-bg)',
      color: 'var(--footer-text)',
      padding: '12px 20px',
      textAlign: 'center'
    }}>
      © 2025, ССРВП
    </footer>
  );
}

export default Footer;
