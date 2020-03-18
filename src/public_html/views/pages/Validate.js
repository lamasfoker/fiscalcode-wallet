"use strict";

const $ = document.querySelector.bind(document);

export default class Validate{
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

    static after_render() {
        $('#header-title').innerText = 'Validatore di Codice Fiscale';
    }
}
