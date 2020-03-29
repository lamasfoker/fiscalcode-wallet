"use strict";

export default class Alert{
    static async show(data) {
        const alert = document.createElement('ion-alert');
        alert.header = data.header;
        alert.message = data.message;
        alert.buttons = data.buttons;
        alert.inputs = data.inputs??[];
        document.body.appendChild(alert);
        alert.present();
    }
}
