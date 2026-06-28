import DrawerComponet from '../Drawer';
import { Avatar, Divider, ListItemButton, ListItemIcon } from '@mui/material';
import { theme } from '@/layout/globalStyles/theme';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';


const HEADER_HEIGHT = 60;

const Head: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: theme.color.primary,
                    borderBottom: `1px solid ${theme.color.white}`,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '4rem', marginTop: '0.6rem' }}>
                        <span style={{ color: theme.color.white }}>Gestão Escolar</span>
                    </div>
                    <div>

                        <ListItemButton onClick={() => setOpen(!open)} sx={{ color: theme.color.white }}>
                            <Avatar
                                src=""
                                sx={{ width: 30, height: 30 }}
                            />
                            <span style={{ color: theme.color.white, marginLeft: '0.5rem', textTransform: 'capitalize', fontSize: '1.1rem' }}>
                                usuario
                            </span>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </div>
                </div>
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
