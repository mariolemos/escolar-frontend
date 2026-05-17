import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Container,
	Box,
} from "@mui/material";
type DataTableProps<T> = {
	columns: Array<{
		key: keyof T;
		label: string;
		render?: (value: any, row: T) => React.ReactNode;
	}>;
	data: T[];
	className?: string;
	titulo?: string;
	buttonList?: Array<{
		nome: string;
		onChange: () => void
	}>;
	containerProps?: React.ComponentProps<typeof TableContainer>;
};
export function DataTable<T extends object>({ columns, data, className, titulo = "", buttonList, containerProps }: DataTableProps<T>) {
	return (
		<TableContainer
			component={Paper}
			className={className}
			{...containerProps}
			sx={
				{
					width: '100vw',
					maxWidth: '100vw',
					maxHeight: "100vw",
					height: "40vw",
					marginTop: 2,
					marginLeft: 1,
					padding: 1,
					...containerProps?.sx
				}
			}
		>
			<h1 style={{ margin: 0, padding: 0, textAlign: 'center' }}>{titulo}</h1>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
				{buttonList?.map((button) => (
					<Button
						sx={{
							backgroundColor: "#233294c9",
							color: "#fff",
							borderRadius: 2,
							marginRight: 1
						}}
						key={button.nome}
						onClick={button.onChange}
					>
						{button.nome}
					</Button>
				))}

			</Box>
			<Table sx={{ width: '100%' }}>
				<TableHead>
					<TableRow>
						{columns.map((col) => (
							<TableCell key={String(col.key)}>{col.label}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.length === 0 ? (
						<TableRow>
							<TableCell colSpan={columns.length} align="center">
								Nenhum dado encontrado
							</TableCell>
						</TableRow>
					) : (
						data.map((row, idx) => (
							<TableRow key={idx}>
								{columns.map((col) => (
									<TableCell key={String(col.key)}>
										{col.render ? col.render(row[col.key], row) : String(row[col.key])}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer >
	);
}

export default DataTable;
