"use strict";

const $ = document.querySelector.bind(document);

export default class NavigationBar{
    static template() {
        return `
            <ion-tabs>
                <ion-tab tab="generate">
                    <ion-header translucent>
                        <ion-toolbar>
                            <ion-title>Calcolatore di Codice Fiscale</ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen class="ion-padding"></ion-content>
                </ion-tab>

                <ion-tab tab="list">
                    <ion-header translucent>
                        <ion-toolbar>
                            <ion-title>Codici Fiscali Salvati</ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen class="ion-padding"></ion-content>
                </ion-tab>

                <ion-tab tab="validate">
                    <ion-header translucent>
                        <ion-toolbar>
                            <ion-title>Validatore di Codice Fiscale</ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen class="ion-padding"></ion-content>
                </ion-tab>

                <ion-tab-bar slot="bottom">
                    <ion-tab-button tab="generate">
                        <ion-icon name="sync-circle-outline"></ion-icon>
                    </ion-tab-button>
                    <ion-tab-button tab="list">
                        <ion-icon name="card-outline"></ion-icon>
                    </ion-tab-button>
                    <ion-tab-button tab="validate">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </ion-tab-button>
                </ion-tab-bar>
            </ion-tabs>
        `
    }

    static render() {
        $('ion-app').innerHTML = this.template();
    }
}
