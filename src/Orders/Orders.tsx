import { useEffect, useState } from 'react';
import { ordersApi, OrderEntity } from '../api/orders.api';
import { Translate, translate } from '../translate';
import { Cards } from './Cards/Cards';
import { PlaceEntity, placesApi } from '../api/places.api';
import { Calendar } from './Calendar/Calendar';

export enum View {
    CARDS = 'cards',
    CALENDAR = 'calendar',
}

export const Orders = ({ view }: { view: View }) => {
    const [orders, setOrders] = useState<OrderEntity[]>([]);
    const [needRefresh, setNeedRefresh] = useState(true);
    const [bosses, setBosses] = useState<PlaceEntity[]>([]);

    const t = translate.order as Translate;

    useEffect(() => {
        const getOrders = async () => {
            const arr = await ordersApi.getList();
            setOrders(arr);
            setNeedRefresh(false);
        };

        const getBosses = async () => {
            const arr = await placesApi.getList();
            setBosses(arr);
        };
        if (needRefresh) {
            getOrders();
            getBosses();
        }
    }, [needRefresh]);

    const handleAddOrder = () => {
        setNeedRefresh(true);
    };

    return (
        <>
            {view === View.CARDS && <Cards orders={orders} onUpdate={handleAddOrder} bosses={bosses} />}
            {view === View.CALENDAR && <Calendar orders={orders} onUpdate={handleAddOrder} bosses={bosses} />}
        </>
    );
};
