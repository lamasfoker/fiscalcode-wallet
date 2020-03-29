"use strict";

function isBrowserCompatible() {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service workers are not supported by this browser');
        return false;
    }
    return true;
}

async function post(url, body) {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');

    let response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    });

    return response.json();
}

const $ = document.querySelector.bind(document);

const $$ = document.querySelectorAll.bind(document);

export {isBrowserCompatible, post, $, $$};