import { useEffect, useState } from 'react';
import { getList, Order } from '../api/orders.api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { showPrice } from '../helpers/show-price';

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            const arr = await getList();
            console.log(arr);
            setOrders(arr);
        };
        getOrders();
    }, []);

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Машина</TableCell>
                        <TableCell align="left">Полная цена</TableCell>
                        <TableCell align="left">Цена на руки</TableCell>
                        <TableCell align="left">Расходы</TableCell>
                        <TableCell align="left">Описание</TableCell>
                        <TableCell align="left">Время</TableCell>
                        <TableCell align="left">Начальник</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.car} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left">{order.car}</TableCell>
                            <TableCell align="left">{showPrice(order.fullPrice)}</TableCell>
                            <TableCell align="left">{showPrice(order.earn)}</TableCell>
                            <TableCell align="left">{showPrice(order.expenses)}</TableCell>
                            <TableCell align="left">{order.description}</TableCell>
                            <TableCell align="left">{`${order.dateFrom} - ${order.dateTo}`}</TableCell>
                            <TableCell align="left">{order.boss?.name ?? 'Я'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
