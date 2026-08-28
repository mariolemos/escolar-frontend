import { useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { RESOURCE } from "../../../auth/resources";
import { permission } from "process";
import { usePermission } from "@/auth/usePermission";

export interface DrawerComponetProps {
  menuList: Array<{
    text: string;
    icon: React.ReactNode;
    href?: string;
    resource?: typeof RESOURCE[keyof typeof RESOURCE];
  }>;
}

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const { hasPermission } = usePermission();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuList: DrawerComponetProps["menuList"] = [
    {
      text: "Inbox",
      icon: <InboxIcon />,
      href: "/exemplo",
    },
    {
      text: "Aluno",
      icon: <MailIcon />,
      href: "/aluno",
      resource: RESOURCE.ALUNO,
    },
    {
      text: "Responsável",
      icon: <InboxIcon />,
      href: "/responsavel",
      resource: RESOURCE.RESPONSAVEL,
    },
    {
      text: "Colégio",
      icon: <InboxIcon />,
      href: "/colegio",
      resource: RESOURCE.RECURSO,
    },
    {
      text: "Contrato",
      icon: <InboxIcon />,
      href: "/contrato",
      resource: RESOURCE.RECURSO,
    },
    {
      text: "Usuário",
      icon: <MailIcon />,
      href: "/usuario",
      resource: RESOURCE.USUARIO,
    },
    {
      text: "Perfil",
      icon: <InboxIcon />,
      href: "/perfil",
      resource: RESOURCE.PERFIL,
    },
  ];


  const authorizedMenuList = menuList.filter((item) => {
    if (!item.resource) {
      return true;
    }
    return hasPermission(item.resource, "VIEW");
  });

  return {
    action: {
      toggleDrawer,
    },
    data: {
      open,
      menuList: authorizedMenuList,
    },
  };
}
