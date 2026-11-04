import exec from 'k6/execution';
import { getShipmentDetails } from './shipment-details.test.js';
import { SHIPMENT_ORDER_NUMBERS } from '../../data/shipment/shipment-data.js';
import { thresholds } from '../../config/thresholds.js';

import {
    RATE,
    TIME_UNIT,
    DURATION,
    PRE_ALLOCATED_VUS,
    MAX_VUS,
    TEST_RUN_ID,
} from '../../config/test-config.js';

export const options = {
    tags: {
        test_run_id: TEST_RUN_ID,
    },

    thresholds,

    scenarios: {
        shipment_api_load: {
            executor: 'constant-arrival-rate',
            rate: RATE,
            timeUnit: TIME_UNIT,
            duration: DURATION,
            preAllocatedVUs: PRE_ALLOCATED_VUS,
            maxVUs: MAX_VUS,
        },
    },
};

export default function () {
    const index =
        exec.scenario.iterationInTest % SHIPMENT_ORDER_NUMBERS.length;

    const orderNumber = SHIPMENT_ORDER_NUMBERS[index];

    getShipmentDetails(orderNumber);
}