import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../../config/qa.env.js';
import {getAuthHeaders} from '../../lib/auth.js';
import {dummy_api1} from '../../data/dummy_apis/dummy_api.js';

export function getDummyapi(){
    const url = `${BASE_URL}/joms/api/tc-status/${dummy_api1}`;

    const response = http.get(url, {
        headers: getAuthHeaders(),
        tags: {api_name: 'dummya_api'},
        timeout: '10s',
        });
    
        check(response, {
            'dummy api is 200 ' : (r) => r.status === 200,
        });

    return response;
}
