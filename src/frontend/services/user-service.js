import {authHeader, handleResponse} from "../helpers";

export const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch('/api/users', requestOptions).then(handleResponse);
}
