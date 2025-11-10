import { instance } from './instance';

export type FilmPriceEntity = {
    id: string;
    filmId: string;
    amount: string;
    createdAt: string;
};

export type FilmEntity = {
    id: string;
    name: string;
    prices: FilmPriceEntity[];
};

export type SaveFilm = {
    id?: string;
    name?: string;
    currentPrice?: string;
};

class FilmsApi {
    private url = 'films';

    public async getList() {
        const items = await instance.get(this.url);

        return items.data;
    }

    public async save(data: SaveFilm) {
        const order = await instance.post(`${this.url}`, data);

        return order.data;
    }
}

export const filmsApi = new FilmsApi();
