import { default as axios } from 'axios';
import { default as qs } from 'qs';

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

    search: (page, make, minYear, maxYear) => {
      return axios.get(`${environment.url}/carmodels`, {
        params: {
          page, make, minYear, maxYear,
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      });
    }
}