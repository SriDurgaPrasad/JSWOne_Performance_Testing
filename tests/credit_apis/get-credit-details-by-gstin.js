
import http from 'k6/http';
import { check } from 'k6';

import { BASE_URL } from '../../config/qa.env.js';
import { CREDIT_TEST_DATA } from '../../data/credit/credit-test-data.js';
import { getAuthHeaders } from '../../lib/auth.js';

export function getCreditDetailsByGstin() {

    const url = `${BASE_URL}/internal/v1/credit/getCreditDetailsByGstin?gstin=${encodeURIComponent(CREDIT_TEST_DATA.gstin)}`;

    const response = http.get(url, {
        headers: getAuthHeaders(),
        tags: {
            api_name: 'credit_details_by_gstin',
        },
        timeout: '10s',
    });

    check(response, {
        'Credit Details By GSTIN returns 200': (r) => r.status === 200,
    });

     console.log(`Credit Info By PAN | Status: ${response.status} | Duration: ${response.timings.duration} ms`);


    return response;
}
