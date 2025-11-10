import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:1488',
    // baseURL: 'https://bayts-server.onrender.com',
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' },
});
