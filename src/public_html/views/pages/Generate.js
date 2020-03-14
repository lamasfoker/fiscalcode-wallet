"use strict";

const $ = document.querySelector.bind(document);
import Utils from "../../services/Utils.js";

let Generate = {

    render: () => {
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
                            <input name="firstname" id="firstname" type="text" autocomplete="off" class="browser-default">
                        </div>
                    </div>
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Cognome</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="lastname" id="lastname" type="text" autocomplete="off" class="browser-default">
                        </div>
                    </div>
                    <div class="row label">
                        <div class="col s12">
                            <h6 class="label-inner">Data di Nascita</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 text">
                            <input name="birthdate" id="birthdate" type="text" autocomplete="off" class="browser-default" placeholder="gg/mm/aaaa">
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

    , after_render: async () => {
        const form = $('#generate-fiscal-code-form');
        const headerTitle = $('#header-title');
        headerTitle.innerText = 'Calcolatore di Codice Fiscale';
        form.onsubmit = Generate.generateFiscalCode;
    }

    , generateFiscalCode: async (event) => {
        event.preventDefault();
        const body = {
            firstname: $('#firstname').value,
            lastname: $('#lastname').value,
            birthday: $('#birthdate').value,
            isMale: $('#male').checked,
            municipality: $('#municipality').value,
        };
        let response = await Utils.post('generate-fiscal-code', JSON.stringify(body));

        if (response.isValid) {
            M.toast({html: response.fiscalcode});
        }
    }
};

export default Generate;