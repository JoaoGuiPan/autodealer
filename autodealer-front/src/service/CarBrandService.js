import { environment } from '../environments/environment';

import { BrandServiceClient } from '../grpc/brand_pb_service';
import { BrandRequest, ListBrandRequest, PageBrandRequest } from '../grpc/brand_pb';

export const carBrandService = {
  create: (carBrand) => {
    return new Promise((resolve, reject) => {
        new BrandServiceClient(environment.url).create(new BrandRequest([carBrand.name]), {}, (err, response) => {
          if (err) {
              reject(err);
          }
          resolve(response.toObject());
        })
    });
  },

  listAll: () => {
    return new Promise((resolve, reject) => {
      new BrandServiceClient(environment.url).list(new ListBrandRequest(), {}, (err, response) => {
        if (err) {
            reject(err);
        }
        resolve(response.toObject());
      })
    });
  },

  search: (page, size, name) => {
    return new Promise((resolve, reject) => {
      new BrandServiceClient(environment.url).search(new PageBrandRequest([name, page, size]), {}, (err, response) => {
        if (err) {
            reject(err);
        }
        resolve(response.toObject());
      })
    });
  }
}