import * as React from 'react';
import MTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ColumnItem {
    label: string,
    dataKey: string,
}

interface Props {
    columns: ColumnItem[],
    data: any[]
}

const Table = ({
    columns, data
}: Props) => {

    return (
        <TableContainer component={Paper}>
            <MTable>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((column: ColumnItem) => {
                                return (
                                    <TableCell key={`column-header-${column.dataKey}`}>{column.label}</TableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((row) => (
                            <TableRow key={row.id}>
                                {
                                    columns.map((column: ColumnItem) => (
                                        <TableCell key={`${row.id}-${column.dataKey}`}>{row[column.dataKey] || 'N/A'}</TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </MTable>
        </TableContainer>
    )

}

export default Table;