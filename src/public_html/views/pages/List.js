"use strict";

const $ = document.querySelector.bind(document);
import People from "../../models/People.js";

export default class List{
    static render() {
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

    static skeleton_render() {
        return `
            {{each(options.list)}}
                <div class="row">
                    <div class="col s12 m6">
                        <div class="card blue-grey darken-1" id="card-{{@index}}">
                            <div class="card-content white-text">
                                <span class="card-title">{{@this.firstName}} {{@this.lastName}}</span>
                                <p>Data di Nascita: {{@this.birthDate}}<br/>
                                Sesso: {{if(@this.isMale)}}Uomo{{#else}}Donna{{/if}}<br/>
                                Comune di Nascita: {{@this.municipality}}
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

    static after_render() {
        //TODO: add delete behaviour
        const people = new People();
        $('#header-title').innerText = 'Codici Fiscali Salvati';
        $('#main-container').innerHTML = Sqrl.Render(this.skeleton_render(), {
            list: people.getList()
        })
    }
}
