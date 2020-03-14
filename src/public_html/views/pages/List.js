"use strict";

const $ = document.querySelector.bind(document);

let List = {

    render: () => {
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

    , after_render: async () => {
        const headerTitle = $('#header-title');
        headerTitle.innerText = 'Codici Fiscali Salvati';
    }
};

export default List;