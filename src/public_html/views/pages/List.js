"use strict";

const $ = document.querySelector.bind(document);

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

    static after_render() {
        const headerTitle = $('#header-title');
        headerTitle.innerText = 'Codici Fiscali Salvati';
    }
}
