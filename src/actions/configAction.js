'use strict';

import * as TYPES from './actionTypes';

export function update_base_url (value = '') {
    return {
        type    : TYPES.UPDATE_BASE_URL,
        payload : value
    }
}
export function update_api_url (value = '') {
    return {
        type    : TYPES.UPDATE_API_URL,
        payload : value
    }
}
export function update_token (value = '') {
    return {
        type    : TYPES.UPDATE_TOKEN,
        payload : value
    }
}