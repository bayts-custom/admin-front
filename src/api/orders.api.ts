import { Boss } from './bosses.api';
import { instance } from './instance';

const url = 'orders';

export type Order = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    car: string;
    description?: string;
    fullPrice?: number;
    earn?: number;
    expenses?: number;
    dateFrom?: Date;
    dateTo?: Date;
    boss?: Boss;
};

export const getList = async () => {
    const orders = await instance.get(url);

    return orders.data;
};

export const get = async (id: string) => {
    const order = await instance.get(`${url}/${id}`);

    return order.data;
};
