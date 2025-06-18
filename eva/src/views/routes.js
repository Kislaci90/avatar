import React from 'react';

import {
    LocationSearch as LocationSearchView,
    LocationDetails as LocationDetailsView,
} from '.';

const routes = [

    {
        path: '/locations',
        renderer: (params = {}) => <LocationSearchView {...params} />,
    },
    {
        path: '/locations/1',
        renderer: (params = {}) => <LocationDetailsView {...params} />,
    },
];

export default routes;