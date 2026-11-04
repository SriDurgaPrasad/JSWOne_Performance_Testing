
import { getCreditInfoByPan } from './get-credit-info-by-pan.js';
import { getCreditSummaryByPan } from './get-credit-summary-by-pan.js';
import { getCreditDetailsByOrder } from './get-credit-details-by-order.js';
import { getCreditDetailsByGstin } from './get-credit-details-by-gstin.js';

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

const testType = __ENV.TEST_TYPE || 'load';

if (!scenarioConfigs[testType]) {
    throw new Error(
        `Invalid TEST_TYPE: ${testType}. Use smoke, load, stress, spike, or soak.`
    );
}

export const options = {
    tags: {
        api_group: 'credit_apis',
        test_type: testType,
        test_run_id: __ENV.TEST_RUN_ID || `credit_apis_${testType}`,
    },
    thresholds,
    scenarios: {
        [testType]: scenarioConfigs[testType],
    },
};

export default function () {
    // getCreditInfoByPan();
    // getCreditSummaryByPan();
    getCreditDetailsByOrder();
    // getCreditDetailsByGstin();
}
