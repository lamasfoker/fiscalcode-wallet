"use strict";

import Save from "../components/alerts/Save.js";
import Toast from "../components/Toast.js";
import {post, $} from "../../services/Utils.js";
import Session from "../../models/Session.js";
import Loading from "../components/Loading.js";

export default class Generate{
    static template() {
        return `
            <form>
                <ion-list lines="full" class="ion-no-margin ion-no-padding">
                    <ion-item>
                        <ion-label position="floating">Nome</ion-label>
                        <ion-input required type="text" class="generate-firstName" autocapitalize="on"></ion-input>
                    </ion-item>
                
                    <ion-item>
                        <ion-label position="floating">Cognome</ion-label>
                        <ion-input required type="text" class="generate-lastName" autocapitalize="on"></ion-input>
                    </ion-item>
                
                    <ion-item>
                        <ion-label>Data di Nascita</ion-label>
                        <ion-datetime
                            display-format="DD MMM YYYY"
                            month-short-names="Gen, Feb, Mar, Apr, Mag, Giu, Lug, Ago, Set, Ott, Nov, Dic"
                            done-text="Fatto"
                            cancel-text="Annulla"
                            class="generate-birthDate"
                            placeholder="Seleziona una Data"
                        ></ion-datetime>
                    </ion-item>
                    
                    <ion-list>
                        <ion-radio-group value="male" class="generate-gender">
                            <ion-list-header>
                                <ion-label>Sesso</ion-label>
                            </ion-list-header>
                            
                            <ion-item>
                                <ion-label>Maschio</ion-label>
                                <ion-radio slot="start" value="male"></ion-radio>
                            </ion-item>
                            
                            <ion-item>
                                <ion-label>Femmina</ion-label>
                                <ion-radio slot="start" value="female"></ion-radio>
                            </ion-item>
                        </ion-radio-group>
                    </ion-list>
                    
                    <ion-item>
                        <ion-label position="floating">Luogo di Nascita</ion-label>
                        <ion-input required type="text" class="generate-municipality" autocapitalize="on"></ion-input>
                    </ion-item>
                </ion-list>
                
                <div class="ion-padding">
                    <ion-button disabled="true" expand="block" type="submit" class="ion-no-margin">Calcola</ion-button>
                </div>
            </form>
        `
    }

    static render() {
        $('[tab=generate] ion-content').innerHTML = this.template();
        $('form').onsubmit = this.generateFiscalCode;
        $('ion-datetime').addEventListener('ionChange', () => {
            $('ion-button').setAttribute('disabled', 'false');
        });
    }

    static async generateFiscalCode(event) {
        event.preventDefault();
        const loading = new Loading();
        loading.present();
        const body = {
            firstName: $('.generate-firstName').value.toUpperCase(),
            lastName: $('.generate-lastName').value.toUpperCase(),
            birthDate: $('.generate-birthDate').value.substring(0, 10),
            isMale: $('.generate-gender').value === 'male',
            municipality: $('.generate-municipality').value.toUpperCase(),
        };
        let response = await post('/generate-fiscal-code', body);
        loading.dismiss();
        if (response.isValid) {
            const session = new Session();
            const fiscalCode = response.fiscalCode;
            body.birthDate = body.birthDate.split('-').reverse().join('/');
            session.insert('person', {...body, fiscalCode: fiscalCode});
            Save.render();
        } else {
            Toast.show('Attenzione: controlla i dati inseriti');
        }
    }
}
