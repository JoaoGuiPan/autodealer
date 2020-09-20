import { environment } from '../environments/environment';

import { CarModelServiceClient } from '../grpc/car_model_pb_service';
import {
  CarModelCreateRequest,
  CarModelFetchRequest,
  CarModelSearchRequest,
  CarModelSuggestionRequest,
  CarModelVO
} from '../grpc/car_model_pb';

export const carModelService = {
  create: (carModel) => {
    const data = [
      carModel.name,
      carModel.brand,
      carModel.version,
      carModel.year,
      `${carModel.price}`,
      `${carModel.fueltype}`,
      `${carModel.fuelconsumptionkmperl}`,
      `${carModel.annualmaintenancecost}`
    ];
    return new Promise((resolve, reject) => {
      new CarModelServiceClient(environment.url).create(new CarModelCreateRequest(data), {}, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response.toObject());
      })
    });
  },

  update: (id, carModel) => {
    const data = [
      id,
      carModel.name,
      carModel.brand,
      carModel.version,
      carModel.year,
      `${carModel.price}`,
      `${carModel.fueltype}`,
      `${carModel.fuelconsumptionkmperl}`,
      `${carModel.annualmaintenancecost}`
    ];
    return new Promise((resolve, reject) => {
      new CarModelServiceClient(environment.url).update(new CarModelVO(data), {}, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response && response.toObject());
      })
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      new CarModelServiceClient(environment.url).fetch(new CarModelFetchRequest([id]), {}, (err, response) => {
          if (err) {
              reject(err);
          }
          resolve(response && response.toObject());
      })
    });
  },

  search: (page, size, make, minYear, maxYear) => {
    const data = [
      minYear,
      !maxYear || maxYear === 0 ? new Date().getFullYear() : maxYear,
      make,
      page,
      size
    ];
    return new Promise((resolve, reject) => {
      new CarModelServiceClient(environment.url).search(new CarModelSearchRequest(data), {}, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response.toObject());
      })
    });
  },

  ranking: (page, size, monthlyTravelDistance, periodInYears, fuelPriceInEurPerL) => {
    const data = [
      `${monthlyTravelDistance}`,
      periodInYears,
      `${fuelPriceInEurPerL}`,
      page,
      size,
    ];
    return new Promise((resolve, reject) => {
      new CarModelServiceClient(environment.url).search(new CarModelSuggestionRequest(data), {}, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response.toObject());
      })
    });
  }

}