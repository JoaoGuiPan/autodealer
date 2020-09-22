import React from 'react';

import MaterialTable from "material-table";

import { CONSTANTS } from '../common/constants';
import { getMatTableFilterValue } from '../common/utils';
import { carModelService } from '../service/CarModelService';
import { carBrandService } from '../service/CarBrandService';

export default function AppCarManagement() {

  const brands = {};

  carBrandService.listAll()
    .then(result => {
      for (const brand of result.brandsList) {
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
        title: 'Price (€)',
        field: 'price',
        type: 'numeric',
        filtering: false,
      },
      {
        title: 'Fuel Type',
        field: 'fueltype',
        lookup: CONSTANTS.fuelTypes,
        filtering: false,
      },
      { title: 'Fuel Consumption (Km/L)', field: 'fuelconsumptionkmperl', type: 'numeric', filtering: false, },
      { title: 'Annual Maintenance Cost (€)', field: 'annualmaintenancecost', type: 'numeric', filtering: false, },
    ]
  });

  const fetch = query => new Promise((resolve, reject) => {

    const make = getMatTableFilterValue(query.filters, 'brand')
    const year = getMatTableFilterValue(query.filters, 'year')

    carModelService.search(query.page, query.pageSize, make, year, year)
      .then(result => {
        resolve({
          data: result.contentList,
          page: result.page,
          pageSize: result.size,
          totalCount: result.totalelements
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