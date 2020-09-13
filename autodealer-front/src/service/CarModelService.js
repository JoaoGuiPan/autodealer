import { default as axios } from 'axios';

import { environment } from '../environments/environment';

export const carModelService = {
    create: (carModel) => {
        return axios.post(`${environment.url}/carmodels`, carModel);
    },

    update: (id, carModel) => {
        return axios.put(`${environment.url}/carmodels/${id}`, carModel);
    },

    getById: (id) => {
        return axios.get(`${environment.url}/carmodels/${id}`);
    },

    search: (minYear, maxYear, brandId) => {
        return axios.get(`${environment.url}/carmodels`, { params: {
            minYear, maxYear, brandId
        } });
    }
}