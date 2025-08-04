import { useEffect, useState } from 'react';
import { getListOrders, OrderEntity } from '../api/orders.api';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useLocalStorage from 'use-local-storage';
import { Order } from './Order';
import { Translate, translate } from '../translate';
import { Columns, Item } from './Columns/Columns';
import { EditOrder } from './EditOrder/EditOrder';
import { Overview } from './Overview/Overview';

const DEFAULT_COLUMNS: Item[] = [
    { id: 0, name: 'carMark', show: true },
    { id: 1, name: 'carModel', show: true },
    { id: 2, name: 'fullPrice', show: true },
    { id: 3, name: 'earn', show: true },
    { id: 4, name: 'expenses', show: true },
    { id: 5, name: 'description', show: true },
    { id: 6, name: 'dateFrom', show: true },
    { id: 7, name: 'dateTo', show: true },
    { id: 8, name: 'boss', show: false },
];
export const Orders = () => {
    const [orders, setOrders] = useState<OrderEntity[]>([]);
    const [columns, setColumns] = useLocalStorage('columns', DEFAULT_COLUMNS);
    const [needRefresh, setNeedRefresh] = useState(true);
    const [orderOverview, setOrderOverview] = useState<OrderEntity | null>(null);

    const t = translate.order as Translate;

    useEffect(() => {
        const getOrders = async () => {
            const arr = await getListOrders();
            setOrders(arr);
            setNeedRefresh(false);
        };
        if (needRefresh) {
            getOrders();
        }
    }, [needRefresh]);

    const handleAddOrder = () => {
        setNeedRefresh(true);
    };

    const onShowOverview = (id: string) => {
        const orderToOverview = orders.find((order) => order.id === id);
        if (orderToOverview) {
            setOrderOverview(orderToOverview);
        }
    };
    const onHideOverview = () => {
        setOrderOverview(null);
    };

    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns
                                .filter(({ show }) => show)
                                .map((column) => (
                                    <TableCell key={t[column.name]} align="left" padding='none'>
                                        {t[column.name]}
                                    </TableCell>
                                ))}
                            <TableCell key='edit-column' align="left" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {needRefresh && <CircularProgress />}
                        {orders.map((order) => (
                            <Order
                                key={order.id}
                                order={order}
                                columns={columns.filter(({ show }) => show).map(({ name }) => name)}
                                onClick={onShowOverview}
                                onUpdate={handleAddOrder}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {!!orderOverview && <Overview data={orderOverview} onCancel={onHideOverview} />}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Columns setItems={setColumns} items={columns} />
                <EditOrder onUpdate={handleAddOrder} />
            </div>
        </>
    );
};
