"use strict";

const STORAGE_KEY = 'people-fiscalcode-wallet';

export default class People {
    constructor() {
        if (JSON.parse(localStorage.getItem(STORAGE_KEY)) === null) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
    }

    getList() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    deleteById(id) {
        let people = JSON.parse(localStorage.getItem(STORAGE_KEY));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people.splice(id, 1)));
    }

    insert(person) {
        let people = JSON.parse(localStorage.getItem(STORAGE_KEY));
        people.push(person);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    }
}
