import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../../config/qa.env.js';
import { getAuthHeaders } from '../../lib/auth.js';

export function orderv2(orderNumber) {
    if (!orderNumber) {
        throw new Error(
            'Order number is missing. Pass a valid order number.'
        );
    }

    const url =
        `${BASE_URL}/oms/order/v2/number/${encodeURIComponent(orderNumber)}`;

    const response = http.get(url, {
        headers: getAuthHeaders(),
        tags: {
            api_name: 'orderv2',
        },
        timeout: '10s',
    });

    check(response, {
        'Order V2 API returns 200': (r) => r.status === 200,
    });

    console.log(
        `Order: ${orderNumber}, ` +
        `Status: ${response.status}, ` +
        `Duration: ${response.timings.duration.toFixed(2)} ms, ` +
        `Body: ${response.body ? response.body.substring(0, 300) : ''}`
    );

    return response;
}