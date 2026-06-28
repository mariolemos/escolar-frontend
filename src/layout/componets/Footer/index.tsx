import { theme } from '@/layout/globalStyles/theme';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      width: '100%',
      padding: '1rem',
      background: theme.color.primary,
      borderTop: `1px solid ${theme.color.white}`,
      textAlign: 'center',
      fontSize: '1rem',
      color: theme.color.white,
      position: 'fixed',
      bottom: 0,
      left: 0,
    }}>
      © {new Date().getFullYear()} Escolar App. Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
