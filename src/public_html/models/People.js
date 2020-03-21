"use strict";

const STORAGE_KEY = 'people-wallet';

export default class People {
    constructor() {
        //TODO: move this class in services/PeopleRepository.js
        //TODO: rename STORAGE_KEY in people-fiscalcode-wallet
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
