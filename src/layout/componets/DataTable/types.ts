import { TableContainer } from "@mui/material";

export type DataTableProps<T> = {
    columns: Array<{
        key: string | keyof T;
        label: string;
        render?: (value: any, row: T) => React.ReactNode;
    }>;
    data: T[];
    className?: string;
    titulo?: string;
    buttonList?: Array<{
        nome: string;
        onChange?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
        icon?: React.ReactNode;
        redirect?: string;
    }>;
    loading?: boolean;
    action?: {
        edit?: {
            onChange: (t: T) => void;
        }
        delete?: {
            onChange: (t: T) => void;
            confirmDelete?: boolean | {
                title?: string;
                description?: (row: T) => React.ReactNode;
                confirmText?: string;
                cancelText?: string;
            }
        }
        status?: {
            onChange: (t: T) => void;
            checked: (t: T) => boolean;
        }
    }
    containerProps?: React.ComponentProps<typeof TableContainer>;
};
