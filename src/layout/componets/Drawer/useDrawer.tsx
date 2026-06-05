import { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

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

  const menuList: DrawerComponetProps["menuList"] = [
    { text: "Inbox", icon: <InboxIcon />, href: "/exemplo" },
    { text: "Aluno", icon: <MailIcon />, href: "aluno" },
    { text: "Responsável", icon: <InboxIcon />, href: "responsavel" },
    { text: "Colégio", icon: <InboxIcon />, href: "colegio" },
  ];

  return {
    action: {
      toggleDrawer,
    },
    data: {
      open,
      menuList,
    },
  };
}
