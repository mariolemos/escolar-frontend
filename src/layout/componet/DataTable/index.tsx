import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
type DataTableProps<T> = {
	columns: Array<{
		key: keyof T;
		label: string;
		render?: (value: any, row: T) => React.ReactNode;
	}>;
	data: T[];
	className?: string;
	containerProps?: React.ComponentProps<typeof TableContainer>;
};
export function DataTable<T extends object>({ columns, data, className, containerProps }: DataTableProps<T>) {
	return (
		<TableContainer
			component={Paper}
			className={className}
			{...containerProps}
			sx={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw', margin: 0, padding: 0, ...containerProps?.sx }}
		>
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
		</TableContainer>
	);
}

export default DataTable;
