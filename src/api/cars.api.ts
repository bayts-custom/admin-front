import { instance } from './instance';

const url = 'cars';

export type CarMarkEntity = {
    id: string;
    name: string;
    rusName: string;
    country: string;
    popular: boolean;
    models: CarModelEntity[];
};

export type CarModelEntity = {
    id: string;
    name: string;
    rusName: string;
    class: string;
    yearFrom?: number;
    yearTo?: number;
    mark: CarMarkEntity;
    markId: string;
};

export const getListMarks = async (search?: string, popular?: boolean): Promise<CarMarkEntity[]> => {
    const orders = await instance.get(
        `${url}/marks?search=${search}&popular=${typeof popular === 'boolean' ? popular : ''}`,
    );

    return orders.data;
};

export const getListModels = async (markId: string, search?: string): Promise<CarModelEntity[]> => {
    const orders = await instance.get(`${url}/models?markId=${markId}&search=${search}`);

    return orders.data;
};

export const getMark = async (id: string): Promise<CarMarkEntity> => {
    const order = await instance.get(`${url}/marks/${id}`);

    return order.data;
};

export const getModel = async (id: string): Promise<CarModelEntity> => {
    const order = await instance.get(`${url}/models/${id}`);

    return order.data;
};
