export const spikeScenario = {
    executor: 'ramping-arrival-rate',
    startRate: 2,
    timeUnit: '1s',
    preAllocatedVUs: 10,
    maxVUs: 80,
    stages: [
        { target: 2, duration: '30s' },
        { target: 20, duration: '5s' },
        { target: 20, duration: '30s' },
        { target: 2, duration: '5s' },
        { target: 2, duration: '30s' },
    ],
};