"use strict";

export default class Utils {
    static isBrowserCompatible() {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service workers are not supported by this browser');
            return false;
        }
        return true;
    }

    static async get(url) {
        let headers = new Headers();
        headers.set('Accept', 'application/json');

        let response = await fetch(url, {
            method: 'GET',
            headers
        });

        return response.json();
    }

    static async post(url, body) {
        let headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        let response = await fetch(url, {
            method: 'POST',
            headers,
            body: body
        });

        return response.json();
    }
}
