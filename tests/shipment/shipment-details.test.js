
import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../../config/qa.env.js';
import { getAuthHeaders } from '../../lib/auth.js';

export function getShipmentDetails(orderNumber) {
    const url =
        `${BASE_URL}/oms/shipment/order-number/` +
        encodeURIComponent(orderNumber);

    const response = http.get(url, {
        headers: getAuthHeaders(),
        tags: {
            api_name: 'shipment_details',
        },
        timeout: '10s',
    });

    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    return response;
}
