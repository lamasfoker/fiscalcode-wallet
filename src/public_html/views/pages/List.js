"use strict";

import {$, $$} from '../../services/Utils.js';
import Session from "../../models/Session.js";
import People from "../../models/People.js";
import Delete from "../components/alerts/Delete.js";

export default class List{
    static emptyTemplate() {
        return `
            <div style="text-align:center">
                <img src="/assets/images/no-elements.png" alt="no researches saved">
                <p>
                    Non hai ancora nessun <ion-text color="primary">Codice Fiscale</ion-text> salvato.<br/>
                    Premi sull'icona 🔄 per generarlo.
                </p>
            </div>
        `
    }

    static fullTemplate() {
        return `
            {{each(options.list)}}
                <ion-card id="card-{{@index}}" color="primary">
                    <a href="http://barcodes4.me/barcode/c39/{{@this.fiscalCode.toLowerCase()}}.png" target="_black">
                        <img src="/bar-code/{{@this.fiscalCode.toLowerCase()}}.png" alt="Codice a Barre della Tessera Sanitaria" />
                    </a>
                    <ion-card-header>
                        <ion-card-subtitle>{{@this.fiscalCode}}</ion-card-subtitle>
                        <ion-card-title>{{@this.firstName}} {{@this.lastName}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Data di Nascita: {{@this.birthDate}}<br/>
                        Sesso: {{if(@this.isMale)}}UOMO{{#else}}DONNA{{/if}}<br/>
                        Luogo di Nascita: {{@this.municipality}}
                    </ion-card-content>
                </ion-card>
            {{/each}}
        `
    }

    static render() {
        const people = new People();
        const container = $('[tab=list] ion-content');
        let list = people.getList();
        if (list.length > 0) {
            container.innerHTML = Sqrl.Render(this.fullTemplate(), {
                list: people.getList()
            });
            this.addSwipeBehaviour();
        } else {
            container.innerHTML = this.emptyTemplate();
        }
    }

    static addSwipeBehaviour() {
        //TODO: cancel swipe if deltay is too wide
        let previousX;
        for (let card of $$('ion-card')) {
            card.addEventListener('touchstart', (event) => {
                previousX = event.changedTouches[0].screenX;
            }, {passive: true});

            card.addEventListener('touchmove', (event) => {
                let currentX = event.changedTouches[0].screenX;
                let currentXOffset = this.getCardXOffset(card);
                card.style.left = (currentXOffset + currentX - previousX) + 'px';
                previousX = currentX;
            }, {passive: true});

            card.addEventListener('touchend', async (event) => {
                if (Math.abs(this.getCardXOffset(card)) > 350) {
                    this.saveIdToDeleteInSession(card);
                    Delete.render();
                } else {
                    card.style.left = '0px';
                }
            }, {passive: true});
        }
    }

    static saveIdToDeleteInSession(card) {
        const id = Number.parseInt(card.id.split('-')[1]);
        const session = new Session();
        session.insert('person-to-delete', id);
    }

    static getCardXOffset(card) {
        return card.style.left===''?0:Number.parseInt(card.style.left.slice(0, -2));
    }
}
