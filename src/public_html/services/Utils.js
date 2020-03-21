"use strict";

export default class Utils {
    static isBrowserCompatible() {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service workers are not supported by this browser');
            return false;
        }
        return true;
    }

    static async post(url, body) {
        //TODO: made here JSON.stringify
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
