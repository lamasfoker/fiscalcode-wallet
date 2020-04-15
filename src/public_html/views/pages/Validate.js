"use strict";

import {post, $} from "../../services/Utils.js";
import Toast from "../components/Toast.js";
import Loading from "../components/Loading.js";

export default class Validate{
    static template() {
        return `
            <form>
                <ion-list lines="full" class="ion-no-margin ion-no-padding">
                    <ion-item>
                        <ion-label position="floating">Codice Fiscale</ion-label>
                        <ion-input required type="text" class="validate-fiscalCode" autocapitalize="on"></ion-input>
                    </ion-item>
                
                    <ion-item>
                        <ion-label position="floating">Nome</ion-label>
                        <ion-input type="text" class="validate-firstName" autocapitalize="on"></ion-input>
                    </ion-item>
                
                    <ion-item>
                        <ion-label position="floating">Cognome</ion-label>
                        <ion-input type="text" class="validate-lastName" autocapitalize="on"></ion-input>
                    </ion-item>
                
                    <ion-item>
                        <ion-label>Data di Nascita</ion-label>
                        <ion-datetime
                            display-format="DD MMM YYYY"
                            month-short-names="Gen, Feb, Mar, Apr, Mag, Giu, Lug, Ago, Set, Ott, Nov, Dic"
                            done-text="Fatto"
                            cancel-text="Annulla"
                            class="validate-birthDate"
                            placeholder="Seleziona una Data"
                        ></ion-datetime>
                    </ion-item>
                    
                    <ion-list>
                        <ion-radio-group class="validate-gender">
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
                        <ion-input type="text" class="validate-municipality" autocapitalize="on"></ion-input>
                    </ion-item>
                </ion-list>

                
                <div class="ion-padding">
                    <ion-button expand="block" type="submit" class="ion-no-margin">Valida</ion-button>
                </div>
            </form>
        `
    }

    static render() {
        //TODO: i think that other fields except fiscal code must be hidden
        //TODO: the keyboard hides the upper values
        $('[tab=validate] ion-content').innerHTML = this.template();
        $('form').onsubmit = this.validateFiscalCode;
    }

    static async validateFiscalCode(event) {
        event.preventDefault();
        const loading = new Loading();
        loading.present();
        const body = {
            fiscalCode: $('.validate-fiscalCode').value,
            firstName: $('.validate-firstName').value,
            lastName: $('.validate-lastName').value,
            birthDate: $('.validate-birthDate').value,
            isMale: $('.validate-gender').value,
            municipality: $('.validate-municipality').value,
        };

        if (typeof body['birthDate'] === "string") {
            body.birthDate = body.birthDate.split('-').join('/');
        }
        if (typeof body['isMale'] === "string") {
            body.isMale = body.isMale === 'male';
        }

        let response = await post('/validate-fiscal-code', body);
        loading.dismiss();
        Toast.show(response.message);
    }
}
