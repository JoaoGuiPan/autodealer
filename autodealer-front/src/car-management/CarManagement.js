import React from 'react';

import MaterialTable from "material-table";

import { CONSTANTS } from '../common/constants';
import { carModelService } from '../service/CarModelService';
import { carBrandService } from '../service/CarBrandService';

export default function AppCarManagement() {

  const brands = {};

  carBrandService.listAll()
    .then(result => {
      for (const brand of result.data) {
        brands[brand.id] = brand.name;
      }
    })
    .catch(err => console.error(err));

  const [state] = React.useState({
    columns: [
      {
        title: 'Name',
        field: 'name',
        filtering: false,
      },
      {
        title: 'Make',
        field: 'brand',
        lookup: brands,
      },
      { title: 'Version', field: 'version', filtering: false, },
      {
        title: 'Year',
        field: 'year',
        type: 'numeric',
      },
      {
        title: 'Price',
        field: 'price',
        type: 'numeric',
        filtering: false,
      },
      {
        title: 'Fuel Type',
        field: 'fuelType',
        lookup: CONSTANTS.fuelTypes,
        filtering: false,
      },
      { title: 'Fuel Consumption (Km/L)', field: 'fuelConsumptionKmPerL', type: 'numeric', filtering: false, },
      { title: 'Annual Maintenance Cost', field: 'annualMaintenanceCost', type: 'numeric', filtering: false, },
    ]
  });

  const getFilterValue = (filters, field) => {
    const filter = filters.find(f => f.column.field === field);
    return filter && filter.value
  };

  const fetch = query => new Promise((resolve, reject) => {

    const make = getFilterValue(query.filters, 'brand')
    const year = getFilterValue(query.filters, 'year')

    carModelService.search(query.page, make, year, year)
      .then(result => {
        const { data } = result;
        resolve({
          data: data.content,
          page: data.pageable.pageNumber,
          totalCount: data.totalElements
        });
      })
      .catch(reject);
  });

  return (
    <MaterialTable
      title="Car Models"
      columns={state.columns}
      options={{
        filtering: true,
        sorting: false,
        search: false,
      }}
      data={fetch}
      editable={{
        onRowAdd: (newData) => carModelService.create(newData),
        onRowUpdate: (newData, oldData) => carModelService.update(oldData.id, newData)
      }}
    />
  );
}