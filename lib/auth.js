export function getAuthHeaders() {
    const token = __ENV.API_TOKEN;

    if (!token) {
        throw new Error(
            'API_TOKEN is missing. Set it before running k6.'
        );
    }

    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}
