"use strict";

const $ = document.querySelector.bind(document);
import api from "../../services/Utils.js";

export default class Validate{
    static template() {
        return `
            <div class="row">
                <form class="col s12" method="POST" action="" id="validate-fiscal-code-form">
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Codice Fiscale</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="fiscalCode" id="fiscalCode" type="text" autocomplete="off" class="browser-default">
                        </div>
                    </div>
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
                            <button class="blue-button" type="submit">Valida</button>
                        </div>
                    </div>
                </form>
            </div>
        `
    }

    static render() {
        $('#header-title').innerText = 'Validatore di Codice Fiscale';
        $('#main-container').innerHTML = this.template();
        $('#validate-fiscal-code-form').onsubmit = this.validateFiscalCode;
    }

    //TODO: if other data other than fiscal code are not filled, isMale value have to be undefined
    static async validateFiscalCode(event) {
        event.preventDefault();
        const body = {
            fiscalCode: $('#fiscalCode').value,
            firstName: $('#firstName').value,
            lastName: $('#lastName').value,
            birthDate: $('#birthDate').value,
            isMale: $('#male').checked,
            municipality: $('#municipality').value,
        };

        let response = await api.post('/validate-fiscal-code', body);

        M.toast({html: response.message});
    }
}
