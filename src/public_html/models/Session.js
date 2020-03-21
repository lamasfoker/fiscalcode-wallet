"use strict";

const SESSION_KEY = 'session-fiscalcode-wallet';

export default class Session {
    constructor() {
        if (JSON.parse(sessionStorage.getItem(SESSION_KEY)) === null) {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify({}));
        }
    }

    getById(id) {
        const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
        if (id in session) {
            return session[id];
        }
        return null;
    }

    insert(id, data) {
        data = {[id]: data};
        let session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({...session, ...data}));
    }
}
