import { orderv2 } from './order-create.test.js';
import { orderdata } from '../../data/orders/orderdata.js';
import { thresholds } from '../../config/thresholds.js';

import { smokeScenario } from '../../scenarios/smoke.js';
import { loadScenario } from '../../scenarios/load.js';
import { stressScenario } from '../../scenarios/stress.js';
import { spikeScenario } from '../../scenarios/spike.js';
import { soakScenario } from '../../scenarios/soak.js';

const scenarioConfigs = {
    smoke: smokeScenario,
    load: loadScenario,
    stress: stressScenario,
    spike: spikeScenario,
    soak: soakScenario,
};

const testType = __ENV.TEST_TYPE || 'smoke';

if (!scenarioConfigs[testType]) {
    throw new Error(
        `Invalid TEST_TYPE: ${testType}. ` +
        'Use smoke, load, stress, spike, or soak.'
    );
}

export const options = {
    tags: {
        api_name: 'orderv2',
        test_type: testType,
        test_run_id:
            __ENV.TEST_RUN_ID || `orderv2_${testType}`,
    },

    thresholds,

    scenarios: {
        [testType]: scenarioConfigs[testType],
    },
};

export default function () {
    orderv2(orderdata);
}