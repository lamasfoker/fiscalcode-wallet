"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const DELETE_MODAL_URL = '#/delete-fiscalcode';
import Session from "../../models/Session.js";
import People from "../../models/People.js";

export default class List{
    static emptyTemplate() {
        return `
            <div class="no-elements">
                <img src="/assets/images/no-elements.svg" alt="no researches saved">
                <h5>Ops...</h5>
                <div>
                    <p>non hai salvato ancora nessun codice fiscale.</p>
                </div>
            </div>
        `
    }

    static fullTemplate() {
        return `
            {{each(options.list)}}
                <div class="row">
                    <div class="col s12 m6">
                        <div class="card blue-grey darken-1" id="card-{{@index}}">
                            <div class="card-content white-text">
                                <span class="card-title">{{@this.firstName}} {{@this.lastName}}</span>
                                <p>Data di Nascita: {{@this.birthDate}}<br/>
                                Sesso: {{if(@this.isMale)}}Uomo{{#else}}Donna{{/if}}<br/>
                                Comune di Nascita: {{@this.municipality}}<br/>
                                Codice FIscale: {{@this.fiscalCode}}</p>
                            </div>
                            <div class="card-action">
                                <a href="http://barcodes4.me/barcode/c39/{{@this.fiscalCode}}.png" target="_blank">Clicca qui per vedere il Codice a Barre</a>
                            </div>
                        </div>
                    </div>
                </div>
            {{/each}}
        `
    }

    static render() {
        const people = new People();
        const container = $('#main-container');
        $('#header-title').innerText = 'Codici Fiscali Salvati';
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
        for (let card of $$('.card')) {
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
                    location.hash = DELETE_MODAL_URL;
                }
            }, {passive: true});

            card.addEventListener('touchend', async (event) => {
                let currentOffset = card.style.left===''?0:Number.parseInt(card.style.left.slice(0, -2));
                if (Math.abs(currentOffset) < 350) {
                    card.style.left = '0px';
                } else {
                    this.saveIdToDeleteInSession(card);
                    location.hash = DELETE_MODAL_URL;
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
