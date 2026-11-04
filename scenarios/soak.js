export const soakScenario = {
    executor: 'constant-arrival-rate',
    rate: 5,
    timeUnit: '1s',
    duration: '60s',
    preAllocatedVUs: 10,
    maxVUs: 30,
};