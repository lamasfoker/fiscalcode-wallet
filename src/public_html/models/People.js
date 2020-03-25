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

    getById(id) {
        const people = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (id in people) {
            return people[id];
        }
        return null;
    }

    deleteById(id) {
        let people = JSON.parse(localStorage.getItem(STORAGE_KEY));
        people.splice(id, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    }

    insert(person) {
        let people = JSON.parse(localStorage.getItem(STORAGE_KEY));
        people.push(person);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    }
}
