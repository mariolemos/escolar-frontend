import React from 'react';
import DrawerComponet from '../Drawer';


const HEADER_HEIGHT = 60;

const Head: React.FC = () => {
    return (
        <>
            <header
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#3ba8ff',
                    borderBottom: '1px solid #fff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                }}
            >
                Escolar App
                <div
                    style={{
                        position: 'fixed',
                        top: '1rem',
                        left: '1rem',
                    }}
                >
                    <DrawerComponet />
                </div>
            </header>
            {/* Spacer para empurrar o conteúdo para baixo do header fixo */}
            <div style={{ height: HEADER_HEIGHT }} />
        </>
    );
};

export default Head;
