import React from 'react';

import { carModelService } from '../service/CarModelService';

export default function AppCarManagement() {

    carModelService.search()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.error(err));

    return <h2>AppCarManagement</h2>;
}