import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Box,
	Switch,
} from "@mui/material";
import Link from "next/link";
import Loading from "@/components/Loading";
import ConfirmModal from '@/components/ConfirmModal';
import { Delete, Edit } from "@mui/icons-material";

type DataTableProps<T> = {
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

export function DataTable<T extends object>({ columns, data, className, titulo = "", buttonList, loading = false, action, containerProps }: DataTableProps<T>) {
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

	return (
		<TableContainer
			component={Paper}
			className={className}
			{...containerProps}
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100%',
				padding: 8,
				...containerProps?.sx,
			}}
		>
			<h1 style={{ margin: 0, padding: 0, textAlign: 'center' }}>{titulo}</h1>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
				{buttonList?.map((button, index) => (
					<Link href={button.redirect ?? "#"} key={index} style={{ textDecoration: 'none' }}>
						<Button
							sx={{
								backgroundColor: "#3ba8ff",
								color: "#fff",
								borderRadius: 2,
								marginRight: 1,
								paddingRight: "16px",
							}}
							key={button.nome}
							onClick={button.onChange}
						>
							{button.icon ?? <>{button.icon}</>}
							{button.nome}
						</Button>
					</Link>
				))}
			</Box>
			<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<Table sx={{ width: '100%', flex: 1, height: '100%' }}>
					<TableHead sx={{ backgroundColor: "#f5f5f5" }}>
						<TableRow>
							{columns.map((col) => (
								<TableCell key={String(col.key)}>{col.label}</TableCell>
							))}
							{action && (
								<TableCell key="actions">Ações</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length === 0 ? (
							<TableRow style={{ height: '60vh' }}>
								<TableCell colSpan={columns.length} align="center" style={{ height: '60vh', verticalAlign: 'middle' }}>
									Nenhum dado encontrado
								</TableCell>
							</TableRow>
						) : (
							data.map((row: T, idx) => (
								<TableRow key={idx}>
									{columns.map((col) => (
										<TableCell key={String(col.key)}>
											{col.render ? col.render((row as any)[col.key], row) : String((row as any)[col.key])}
										</TableCell>
									))}
									{action && (
										<TableCell>
											{action.edit && (
												<Button size="small" color="primary" onClick={() => action?.edit?.onChange(row)}><Edit fontSize="small" /></Button>
											)}
											{action.status && (
												<Button size="small" onClick={() => action?.status?.onChange(row)}><Switch color="success" checked={action.status.checked(row)}></Switch></Button>
											)}
											{action.delete && (
												<Button size="small" color="error" onClick={() => handleDeleteClick(row)}><Delete fontSize="small" /></Button>
											)}
										</TableCell>
									)}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</Box>
			<Loading isLoading={loading} />

			<ConfirmModal
				open={confirmOpen}
				setOpen={setConfirmOpen}
				title={modalTitle}
				description={'Deseja realmente excluir este item?'}
				confirmText={modalConfirmText}
				cancelText={modalCancelText}
				onConfirm={handleConfirm}
			/>
		</TableContainer>
	);
}

export default DataTable;
