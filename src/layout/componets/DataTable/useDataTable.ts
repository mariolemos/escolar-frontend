import { useState } from "react";
import { DataTableProps } from "./types";

interface propsUseDataTable<T> {
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
}

export const useDataTable = <T extends object>({
    action
}: propsUseDataTable<T>) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<T | null>(null);
    const handleDeleteClick = (row: T) => {
        const confirmSetting = action?.delete?.confirmDelete;
        if (confirmSetting) {
            setSelectedRow(row);
            setConfirmOpen(true);
            return;
        }
        action?.delete?.onChange(row);
    }

    const handleConfirm = () => {
        if (selectedRow) {
            action?.delete?.onChange(selectedRow);
            setSelectedRow(null);
        }
        setConfirmOpen(false);
    }

    const modalTitle = typeof action?.delete?.confirmDelete === 'object' && action!.delete!.confirmDelete!.title ? action!.delete!.confirmDelete!.title : 'Confirmar exclusão';
    const modalConfirmText = typeof action?.delete?.confirmDelete === 'object' && action!.delete!.confirmDelete!.confirmText ? action!.delete!.confirmDelete!.confirmText : 'Excluir';
    const modalCancelText = typeof action?.delete?.confirmDelete === 'object' && action!.delete!.confirmDelete!.cancelText ? action!.delete!.confirmDelete!.cancelText : 'Cancelar';
    return {
        action: {
            handleDeleteClick,
            handleConfirm,
            setConfirmOpen,
            setRowsPerPage,
            setPage,
        },
        data: {
            modalCancelText,
            modalConfirmText,
            modalTitle,
            confirmOpen,
            rowsPerPage,
            page,
        }
    }
}