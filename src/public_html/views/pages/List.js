"use strict";

//TODO: import $ and $$ as external function
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import Session from "../../models/Session.js";
import People from "../../models/People.js";
import Delete from "../components/alerts/Delete.js";

export default class List{
    static emptyTemplate() {
        return `
            <img src="/assets/images/no-elements.svg" alt="no researches saved">
            <h5>Ops...</h5>
            <p>non hai salvato ancora nessun codice fiscale.</p>
        `
    }

    static fullTemplate() {
        return `
            {{each(options.list)}}
                <ion-card id="card-{{@index}}>
                    <img src="http://barcodes4.me/barcode/c39/{{@this.fiscalCode}}.png" />
                    <ion-card-header>
                        <ion-card-subtitle>Codice Fiscale #{{@index}}</ion-card-subtitle>
                        <ion-card-title>{{@this.firstName}} {{@this.lastName}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        Data di Nascita: {{@this.birthDate}}<br/>
                        Sesso: {{if(@this.isMale)}}Uomo{{#else}}Donna{{/if}}<br/>
                        Comune di Nascita: {{@this.municipality}}<br/>
                        Codice FIscale: {{@this.fiscalCode}}
                    </ion-card-content>
                </ion-card>
            {{/each}}
        `
    }

    static render() {
        //TODO: add card after save
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
        let previousX;
        for (let card of $$('ion-card')) {
            card.addEventListener('touchstart', (event) => {
                previousX = event.changedTouches[0].screenX;
            }, {passive: true});

            card.addEventListener('touchmove', (event) => {
                let currentX = event.changedTouches[0].screenX;
                let currentOffset = card.style.left===''?0:Number.parseInt(card.style.left.slice(0, -2));
                card.style.left = (currentOffset + currentX - previousX) + 'px';
                previousX = currentX;
                if (Math.abs(currentOffset) > 350) {
                    this.saveIdToDeleteInSession(card);
                    Delete.render();
                }
            }, {passive: true});

            card.addEventListener('touchend', async (event) => {
                let currentOffset = card.style.left===''?0:Number.parseInt(card.style.left.slice(0, -2));
                if (Math.abs(currentOffset) < 350) {
                    card.style.left = '0px';
                } else {
                    this.saveIdToDeleteInSession(card);
                    Delete.render();
                }
            }, {passive: true});
        }
    }

    static saveIdToDeleteInSession(card) {
        const id = Number.parseInt(card.id.split('-')[1]);
        const session = new Session();
        session.insert('person-to-delete', id);
    }
}
