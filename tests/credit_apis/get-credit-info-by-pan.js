
import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../../config/qa.env.js';
import { CREDIT_TEST_DATA } from '../../data/credit/credit-test-data.js';
import { getAuthHeaders } from '../../lib/auth.js';

export function getCreditInfoByPan() {
    const url = `${BASE_URL}/credit/internal/v1/getCreditInfoByPan?pan=${encodeURIComponent(CREDIT_TEST_DATA.pan)}`;

     const response = http.get(url, {
        headers: getAuthHeaders(),
        tags: {
            api_name: 'get-credit-info-by-pan',
        },
        timeout: '10s',
    });


    check(response, {
        'Credit Info By PAN returns 200': (r) => r.status === 200,
    });

    console.log(`Credit Info By PAN | Status: ${response.status} | Duration: ${response.timings.duration} ms`);

    return response;
}
