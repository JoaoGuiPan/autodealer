import React from 'react';

import MaterialTable from "material-table";

import { carBrandService } from '../service/CarBrandService';

export default function AppBrandManagement() {

  const fetch = query => new Promise((resolve, reject) => {

    carBrandService.search(query.page, query.pageSize, (query.search && query.search.toLowerCase()))
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

  const [state] = React.useState({
    columns: [
      {
        title: 'Name',
        field: 'name',
      },
      {
        title: 'ID',
        field: 'id',
      },
    ]
  });

  return (
      <MaterialTable
        title="Car Brands"
        columns={state.columns}
        data={fetch}
        options={{
          sorting: false,
        }}
        editable={{
          onRowAdd: (newData) => carBrandService.create(newData),
        }}
      />
  );
}