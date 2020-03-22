"use strict";

const $ = document.querySelector.bind(document);
import api from "../../services/Utils.js";
import Session from "../../models/Session.js";

export default class Generate{
    static template() {
        return `
            <div class="row">
                <form class="col s12" method="POST" action="#/save-modal" id="generate-fiscal-code-form">
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Nome</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="firstName" id="firstName" type="text" autocomplete="off" class="browser-default">
                        </div>
                    </div>
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Cognome</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="lastName" id="lastName" type="text" autocomplete="off" class="browser-default">
                        </div>
                    </div>
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Data di Nascita</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="birthDate" id="birthDate" type="text" autocomplete="off" class="browser-default" placeholder="gg/mm/aaaa">
                        </div>
                    </div>
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Sesso</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <label>
                                <input class="with-gap" name="gender" type="radio" checked="checked" id="male"/>
                                <span>Maschio</span>
                            </label>
                            <label>
                                <input class="with-gap" name="gender" type="radio" id="female"/>
                                <span>Femmina</span>
                            </label>
                        </div>
                    </div>
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Luogo di Nascita</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="municipality" id="municipality" type="text" autocomplete="off" class="browser-default">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="blue-button" type="submit">Calcola</button>
                        </div>
                    </div>
                </form>
            </div>
        `
    }

    static render() {
        $('#header-title').innerText = 'Calcolatore di Codice Fiscale';
        $('#main-container').innerHTML = this.template();
        $('#generate-fiscal-code-form').onsubmit = this.generateFiscalCode;
    }

    static async generateFiscalCode(event) {
        //TODO: if it is present on session the field can be autofilled
        event.preventDefault();
        const body = {
            firstName: $('#firstName').value,
            lastName: $('#lastName').value,
            birthDate: $('#birthDate').value,
            isMale: $('#male').checked,
            municipality: $('#municipality').value,
        };
        let response = await api.post('/generate-fiscal-code', body);

        if (response.isValid) {
            const session = new Session();
            const fiscalCode = response.fiscalCode;
            session.insert('person', {...body, fiscalCode: fiscalCode});
            location.hash = event.target.getAttribute("action");
        } else {
            M.toast({html: 'Attenzione: controlla i dati inseriti', activationPercent: 0.4});
        }
    }
}
