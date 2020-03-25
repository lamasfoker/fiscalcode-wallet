"use strict";

const $ = document.querySelector.bind(document);
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";

export default class Delete{
    static template() {
        return `
            <div class="modal">
                <div class="modal-content">
                    <h4>Attenzione</h4>
                    <p>Vuoi davvero eliminare le informazioni salvate su {{firstName}} {{lastName}}?</p>
                </div>
                <div class="modal-footer">
                    <a href="#/list" id="sure" class="modal-close waves-effect waves-green btn-flat">Sì</a>
                    <a href="#/list" class="modal-close waves-effect waves-green btn-flat">No</a>
                </div>
            </div>
        `
    }

    static render() {
        const session = new Session();
        const people = new People();
        const personId = session.getById('person-to-delete');
        const person = people.getById(personId);
        $('#main-container').innerHTML = Sqrl.Render(this.template(), {
            firstName: person.firstName,
            lastName: person.lastName
        });
        const modal = $('.modal');
        M.Modal.init(modal,{
            startingTop: '120%',
            dismissible: false
        });
        M.Modal.getInstance(modal).open();
        $('#sure').onclick = () => {
            people.deleteById(personId);
        };
    }
}
