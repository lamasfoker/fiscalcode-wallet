"use strict";

const $ = document.querySelector.bind(document);
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";

export default class Save{
    static template() {
        return `
            <div class="modal">
                <div class="modal-content">
                    <h4>{{fiscalCode}}</h4>
                    <p>Il codice indicato è corretto?</p>
                </div>
                <div class="modal-footer">
                    <a href="#/list" id="correct" class="modal-close waves-effect waves-green btn-flat">Sì</a>
                    <a href="#/check-omocodie" id="incorrect" class="modal-close waves-effect waves-green btn-flat">No</a>
                    <a href="#/generate" class="modal-close waves-effect waves-green btn-flat">Annulla</a>
                </div>
            </div>
        `
    }

    static render() {
        const session = new Session();
        const person = session.getById('person');
        $('#main-container').innerHTML = Sqrl.Render(this.template(), {
            fiscalCode: person.fiscalCode
        });
        const modal = $('.modal');
        M.Modal.init(modal,{
            startingTop: '120%',
            dismissible: false
        });
        M.Modal.getInstance(modal).open();
        $('#correct').onclick = async () => {
            const people = new People();
            people.insert(person);
            session.deleteById('person');
        };
    }
}
