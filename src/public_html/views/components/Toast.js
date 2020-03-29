"use strict";

export default class Toast{
    static show(message) {
        const toast = document.createElement('ion-toast');
        toast.message = message;
        toast.duration = 2000;
        document.body.appendChild(toast);
        toast.present();
    }
}
