import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      width: '100%',
      padding: '1rem',
      background: '#f5f5f5',
      borderTop: '1px solid #e0e0e0',
      textAlign: 'center',
      fontSize: '1rem',
      color: '#888',
      position: 'fixed',
      bottom: 0,
      left: 0,
    }}>
      © {new Date().getFullYear()} Escolar App. Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
