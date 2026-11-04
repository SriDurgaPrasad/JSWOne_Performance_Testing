
import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../../config/qa.env.js';
import { getAuthHeaders } from '../../lib/auth.js';

export function getCreditDetailsByOrder() {
    const orderNumber = __ENV.ORDER_NUMBER;

    if (!orderNumber) {
        throw new Error('ORDER_NUMBER environment variable is missing.');
    }

    const url = `${BASE_URL}/external/v1/credit-details?orderNumber=${encodeURIComponent(orderNumber)}`;

    
    const response = http.get(url, {
        headers: getAuthHeaders(),
        tags: {
            api_name: 'credit_details_by_order',
        },
        timeout: '10s',
    });

   

   check(response, {
    'Status is 200': (r) => r.status === 200,
    'Response is JSON': (r) =>
        r.headers['Content-Type']?.includes('application/json'),
});

console.log(`Requested URL: ${url}`);
console.log(`Final URL: ${response.url}`);
console.log(`Content-Type: ${response.headers['Content-Type']}`);
console.log(`Response Body: ${response.body.substring(0, 300)}`);

    // console.log(`Credit Details By Order | Status: ${response.status} | Duration: ${response.timings.duration} ms | BODY: ${response.body}`);

    return response;
}
