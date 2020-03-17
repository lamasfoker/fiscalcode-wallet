"use strict";

const $ = document.querySelector.bind(document);
import Utils from "../../services/Utils.js";
import People from "../../models/People.js";

export default class Generate{
    static render() {
        return `
            <div class="row">
                <form class="col s12" method="POST" action="" id="generate-fiscal-code-form">
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

    static after_render() {
        const generate = new Generate();
        const form = $('#generate-fiscal-code-form');
        const headerTitle = $('#header-title');
        headerTitle.innerText = 'Calcolatore di Codice Fiscale';
        form.onsubmit = generate.generateFiscalCode;
    }

    async generateFiscalCode(event) {
        const people = new People();
        event.preventDefault();
        const body = {
            firstName: $('#firstName').value,
            lastName: $('#lastName').value,
            birthDate: $('#birthDate').value,
            isMale: $('#male').checked,
            municipality: $('#municipality').value,
        };
        let response = await Utils.post('/generate-fiscal-code', JSON.stringify(body));

        if (response.isValid) {
            const fiscalCode = response.fiscalCode;
            M.toast({html: fiscalCode});
            people.insert({...body, fiscalCode: fiscalCode});
        }
    }
}
