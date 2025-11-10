import { instance } from './instance';

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

class CarsApi {
    private url = 'cars';

    public async getListMarks(search?: string, popular?: boolean) {
        const items = await instance.get(`${this.url}/marks`, {
            params: {
                search,
                popular: typeof popular === 'boolean' ? popular : '',
            },
        });

        return items.data;
    }

    public async getListModels(markId: string, search?: string) {
        const order = await instance.get(`${this.url}/models`, {
            params: {
                markId,
                search,
            },
        });

        return order.data;
    }

    public async getMark(id: string) {
        const items = await instance.get(`${this.url}/marks/${id}`);

        return items.data;
    }

    public async getModel(id: string) {
        const order = await instance.post(`${this.url}/models/${id}`);

        return order.data;
    }
}

export const carsApi = new CarsApi();
