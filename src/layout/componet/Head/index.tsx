import React from 'react';
import DrawerComponet from '../Drawer';

const Head: React.FC = () => {
    return (
        <>
            <header style={{
                width: '100%',
                padding: '1rem',
                background: '#f5f5f5',
                borderBottom: '1px solid #4c8b8d',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
            }}>
                Escolar App
            </header>
            <DrawerComponet />
        </>
    );
};

export default Head;
