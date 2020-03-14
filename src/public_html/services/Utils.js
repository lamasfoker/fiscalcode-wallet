"use strict";

const Utils = {
    isBrowserCompatible: () => {
        if (!('serviceWorker' in navigator)) {
            console.warn('Service workers are not supported by this browser');
            return false;
        }
        return true
    }

    , get: async (url) => {
        let headers = new Headers();
        headers.set('Accept', 'application/json');

        let response = await fetch(url, {
            method: 'GET',
            headers
        });

        return response.json();
    }

    , post: async (url, body) => {
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
};

export default Utils;