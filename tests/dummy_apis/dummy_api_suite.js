
import { getDummyapi } from './dummy_api_test.js';
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
        api_name: 'dummy_api_test',
        test_type: testType,
        test_run_id: __ENV.TEST_RUN_ID || `dummy_api_test_${testType}`,
    },
    thresholds,
    scenarios: {
        [testType]: scenarioConfigs[testType],
    },
};

export default function () {
    getDummyapi();
}
