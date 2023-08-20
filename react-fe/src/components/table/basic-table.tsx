import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { OtherHouses } from '@mui/icons-material';

interface OptionItem {
    label: string,
    value: string
}

interface ColumnItem {
    label: string,
    dataKey: string,
    // needed for when adding items to list
    editable?: boolean,
    type?: string,
    options?: OptionItem[],
    valueToLabelMap?: any,
}

interface Props {
    columns: ColumnItem[],
    data: any[],
    onRowClick ?: (id: string) => void,
    getID?: (item: any) => any,
    handleAdd?: () => void,
    onFieldChange?: (id: string, key: string, value: any) => void
}

const getValue = (item: any, key: string) => {
    const path = key.split('.')
    let value = item
    path.forEach(k => {
        value = value[k]
    })
    return value
}

const Table = ({
    columns, data, onRowClick, handleAdd, onFieldChange = (item: any, key: string) => {}, getID = (item: any) => item.id
}: Props) => {

    const [showAdd, setShowAdd] = React.useState(false);

    const renderField = (column: ColumnItem, row: any) => {

        if (column.options) {

            const defaultValue = getValue(row, column.dataKey)
            const selectedOption = column.options.find((opt) => opt.value == defaultValue)

            return (
                <TextField 
                select
                defaultValue={defaultValue}
                onChange={(newValue) => onFieldChange(getID(row), column.dataKey, newValue.target.value)}
                >
                    {
                        selectedOption
                        ?
                        null
                        :
                        <MenuItem key={defaultValue} value={defaultValue}>{column.valueToLabelMap ? column.valueToLabelMap[defaultValue] : defaultValue}</MenuItem>
                    }
                    {
                        column.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
                </TextField>
            )
        }

        return (
            <TextField 
            type={column.type}
            InputProps={
            column.type == 'number' ? {
                inputProps: {
                    step: '0.01',  // This will allow decimals to the hundredths place
                }
            }: {}}
            defaultValue={getValue(row, column.dataKey)}
            onBlur={(newValue) => onFieldChange(getID(row), column.dataKey, newValue.target.value)}
            />
        )
    }

    return (
        <Box>
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
                            <TableRow 
                            key={getID(row)} 
                            hover={onRowClick ? true : false} 
                            onClick={() => onRowClick ? onRowClick(getID(row)) : null}
                            >
                                {
                                    columns.map((column: ColumnItem) => (
                                        <TableCell key={`${getID(row)}-${column.dataKey}`}>
                                            {
                                                column.editable
                                                ?
                                                renderField(column, row)
                                                :
                                                getValue(row, column.dataKey)
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                    {
                        handleAdd
                        ?
                        <TableRow key='add-row'>
                            <TableCell colSpan={columns.length}>
                            <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                <Button variant="contained" onClick={handleAdd}>Add Item</Button>
                            </Box>
                            </TableCell>
                        </TableRow>
                        :
                        null
                    }
                </TableBody>
            </MTable>
        </TableContainer>
        </Box>
    )

}

export default Table;