import { TableCell, TableRow } from '@mui/material';
import { showPrice } from '../helpers/show-price';
import { OrderEntity } from '../api/orders.api';
import { useMemo } from 'react';
import { EditOrder } from './EditOrder/EditOrder';
import EditIcon from '@mui/icons-material/Edit';

type OrderProps = {
    order: OrderEntity;
    columns: string[];
    onClick: (id: string) => void;
    onUpdate: () => void;
};

export const Order = ({ order, columns, onClick, onUpdate }: OrderProps) => {
    const data: string[] = useMemo(
        () =>
            columns.map((column) => {
                switch (column) {
                    case 'carMark': {
                        return order.carMark.name ?? 'N/A';
                    }
                    case 'carModel': {
                        return order.carModel.name ?? 'N/A';
                    }
                    case 'fullPrice': {
                        return showPrice(order.fullPrice) ?? 'N/A';
                    }
                    case 'earn': {
                        return showPrice(order.earn) ?? 'N/A';
                    }
                    case 'expenses': {
                        return showPrice(order.expenses) ?? 'N/A';
                    }
                    case 'description': {
                        return order.description ?? 'N/A';
                    }
                    case 'dateFrom': {
                        return order.dateFrom?.toString() ?? 'N/A';
                    }
                    case 'dateTo': {
                        return order.dateTo?.toString() ?? 'N/A';
                    }
                    case 'boss': {
                        return order.boss?.name ?? 'Я';
                    }
                    default: {
                        return 'N/A';
                    }
                }
            }),
        [order, columns],
    );

    // const handleClick = () => {
    //     onClick(order.id);
    // };

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
            {data.map((row, i) => (
                <TableCell key={`${columns[i]}-${i}-${row}`} align="left"  padding='none'>
                    {row}
                </TableCell>
            ))}
            <TableCell key={`${order.id}-edit-column`} align="left" padding='none'>
                <EditOrder onUpdate={onUpdate} data={order}>
                    <EditIcon />
                </EditOrder>
            </TableCell>
        </TableRow>
    );
};
