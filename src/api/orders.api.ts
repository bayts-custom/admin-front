import { Boss } from './bosses.api';
import { CarMarkEntity, CarModelEntity } from './cars.api';
import { instance } from './instance';

const url = 'orders';

export type OrderEntity = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    carMark: CarMarkEntity;
    carModel: CarModelEntity;
    description?: string;
    fullPrice?: number;
    earn?: number;
    expenses?: number;
    dateFrom?: Date;
    dateTo?: Date;
    boss?: Boss;
};

export type SaveOrder = {
    id?: string;
    carMarkId: string;
    carModelId: string;
    description?: string;
    fullPrice?: number;
    earn?: number;
    expenses?: number;
    dateFrom?: string;
    dateTo?: string;
    bossId?: string;
    bossName?: string;
};

export const getListOrders = async (): Promise<OrderEntity[]> => {
    const orders = await instance.get(url);

    return orders.data;
};

export const getOrder = async (id: string): Promise<OrderEntity> => {
    const order = await instance.get(`${url}/${id}`);

    return order.data;
};

export const saveOrder = async (data: SaveOrder): Promise<OrderEntity> => {
    console.log(data)
    const order = await instance.post(`${url}`, data);

    return order.data;
};
