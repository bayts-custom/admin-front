import { PlaceEntity } from './places.api';
import { CarMarkEntity, CarModelEntity } from './cars.api';
import { FilmEntity } from './films.api';
import { instance } from './instance';
import { Dayjs } from 'dayjs';
import { fromDayjsToString } from '../helpers/show-date-period.helper';

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
    ROOF_STRIP = 'roof_strip', // polosa na krishy
    MIRROR = 'mirror',
    HATCH = 'hatch', // luk benzobaka
    THRESHOLDS_IN = 'thresholds_in', // porogi vnyt
    THRESHOLDS_EX = 'thresholds_ex', // porogi vnesh
    EXPANDER = 'expander', // rasshiriteli
    HANDLE = 'handle', // zona pod ruchkami
    HEADLIGHT = 'headlight', // fari
}

export enum OrderStatus {
    NEW = 'new',
    CAR_ARRIVED = 'car_arrived',
    IN_PROGRESS = 'in_progress',
    BLOCKED = 'blocked',
    DONE = 'done',
}

export type OrderEntity = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
    color: string;
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

export type OrderLogEntity = {
    id: string;
    createdAt: Date;
    status: OrderStatus;
    orderId: string;
};

export type SaveOrder = {
    id?: string;
    carMarkId: string;
    carModelId: string;
    status?: OrderStatus;
    color?: string;
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
    logs?: OrderLogEntity[];
};

export enum OrderSort {
    CREATED_AT = 'createdAt',
}

export type GetOrders = {
    dateFrom?: Dayjs;
    dateTo?: Dayjs;
    status?: OrderStatus[];
    orderBy?: OrderSort;
    order?: 'asc' | 'desc';
};

class OrdersApi {
    private url = 'orders';

    public async getList(query?: GetOrders) {
        const orders = await instance.get(this.url, {
            params: {
                ...query,
                dateFrom: query?.dateFrom ? fromDayjsToString(query.dateFrom) : undefined,
                dateTo: query?.dateTo ? fromDayjsToString(query.dateTo) : undefined,
            },
        });

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
