"use strict";

export default class Loading{
    constructor() {
        const loading = document.createElement('ion-loading');
        loading.message = 'Attendi';
        document.body.appendChild(loading);
        return loading;
    }
}
