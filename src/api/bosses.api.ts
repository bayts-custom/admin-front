import { instance } from './instance';

const url = 'bosses';

export type Boss = {
    id: string;
    name: string;
}

export const getBossesList = async () => {
    const orders = await instance.get(url);

    return orders.data;
};
