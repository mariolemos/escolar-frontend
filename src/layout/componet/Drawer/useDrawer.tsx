import { useState } from "react";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export interface DrawerComponetProps {
    menuList: Array<{
        text: string;
        icon: React.ReactNode;
        href?: string;
    }>;
}

export default function Drawer() {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const menuList: DrawerComponetProps['menuList'] = [
        { text: 'Inbox', icon: <InboxIcon />, href: "/" },
        { text: 'Starred', icon: <MailIcon />, href: "exemplo" },
        { text: 'Send email', icon: <InboxIcon />, href: "exemplo" },
    ]

    return {
        action: {
            toggleDrawer
        },
        data: {
            open,
            menuList
        }
    }
}