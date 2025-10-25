import { PlaceEntity } from './places.api';
import { CarMarkEntity, CarModelEntity } from './cars.api';
import { FilmEntity } from './films.api';
import { instance } from './instance';

export enum WorkType {
    FULL = 'full',
    FRONT = 'front',
    DETAILS = 'details',
}

export enum Details {
    DOORS = 'doors',
    HOOD = 'hood', // kapot
    ROOF = 'roof',
    BUMPER = 'bumper',
    WING = 'wing', // krilo
    PILLAR = 'pillar', // stoyka
    ROOF_STRIP = 'roof strip', // polosa na krishy
    MIRROR = 'mirror',
    HEADLIGHT = 'headlight', // fari
}

export type OrderEntity = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string;
    fullPrice?: number;
    filmPrice?: number;
    placePrice?: number;
    expenses?: number;
    film?: FilmEntity;
    workType?: WorkType;
    details?: Details[];
    filmLength?: number;
    complicity?: number;
    review?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
    boss?: PlaceEntity;
    carMark: CarMarkEntity;
    carModel: CarModelEntity;
};

export type SaveOrder = {
    id?: string;
    carMarkId: string;
    carModelId: string;
    filmId?: string;
    description?: string;
    fullPrice?: number;
    filmPrice?: number;
    placePrice?: number;
    expenses?: number;
    workType?: WorkType;
    details?: Details[];
    filmLength?: number;
    complicity?: number;
    review?: boolean;
    dateFrom?: string;
    dateTo?: string;
    bossId?: string;
    bossName?: string;
};

class OrdersApi {
    private url = 'orders';

    public async getList() {
        const orders = await instance.get(this.url);

        return orders.data;
    }

    public async get(id: string) {
        const order = await instance.get(`${this.url}/${id}`);

        return order.data;
    }

    public async save(data: SaveOrder) {
        const order = await instance.post(`${this.url}`, data);

        return order.data;
    }
}

export const ordersApi = new OrdersApi();