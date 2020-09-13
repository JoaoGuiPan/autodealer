import { default as axios } from 'axios';

import { environment } from '../environments/environment';

export const carBrandService = {
    create: (carBrand) => {
        return axios.post(`${environment.url}/brands`, carBrand);
    },

    listAll: () => {
        return axios.get(`${environment.url}/brands`);
    }
}