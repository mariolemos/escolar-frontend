import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Switch,
	Container,
	Button as Button_M,
	TablePagination
} from "@mui/material";
import Link from "next/link";
import Loading from "@/components/Loading";
import ConfirmModal from '@/components/ConfirmModal';
import { Delete, Edit } from "@mui/icons-material";
import Button from "../Button";
import { DataTableProps } from "./types";
import { useDataTable } from "./useDataTable";


export function DataTable<T extends object>({ columns, data, className, titulo = "", buttonList, loading = false, action, containerProps }: DataTableProps<T>) {

	const {
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
	} = useDataTable<T>(
		{ action }
	);

	return (
		<Container maxWidth={'xl'}>

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
				<Box sx={{ marginTop: 0, marginBottom: 2 }}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<div>
							<h1 style={{ margin: 0, padding: 0 }}>{titulo}</h1>
						</div>
						<div>
							{buttonList?.map((button, index) => (
								<Link href={button.redirect ?? "#"} key={index} style={{ textDecoration: 'none' }}>
									<Button
										nome={button.nome}
										onClick={button.onChange}
										icon={button.icon}
									/>
								</Link>
							))}
						</div>
					</div>
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
													<Button_M size="small" color="primary" onClick={() => action?.edit?.onChange(row)}><Edit fontSize="small" /></Button_M>
												)}
												{action.status && (
													<Button_M size="small" onClick={() => action?.status?.onChange(row)}><Switch color="success" checked={action.status.checked(row)}></Switch></Button_M>
												)}
												{action.delete && (
													<Button_M size="small" color="error" onClick={() => handleDeleteClick(row)}><Delete fontSize="small" /></Button_M>
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
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={(e, page) => { setPage(page) }}
					onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)) }}
				/>
			</TableContainer>
		</Container>
	);
}

export default DataTable;
