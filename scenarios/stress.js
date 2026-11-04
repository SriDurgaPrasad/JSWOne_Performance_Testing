export const stressScenario = {
    executor: 'ramping-arrival-rate',
    startRate: 5,
    timeUnit: '1s',
    preAllocatedVUs: 10,
    maxVUs: 80,
    stages: [
        { target: 5, duration: '10s' },
        { target: 10, duration: '10s' },
        { target: 15, duration: '10s' },
        { target: 20, duration: '10s' },
    ],
};