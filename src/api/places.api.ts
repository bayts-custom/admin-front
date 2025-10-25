import { instance } from './instance';

export type PlaceEntity = {
    id: string;
    name: string;
}

class PlacesApi {
    private url = 'bosses';

    public async getList() {
        const items = await instance.get(this.url);

        return items.data;
    }
}

export const placesApi = new PlacesApi();