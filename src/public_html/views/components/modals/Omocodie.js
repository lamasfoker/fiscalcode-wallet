"use strict";

const $ = document.querySelector.bind(document);
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";
import api from "../../../services/Utils.js";

export default class Omocodie{
    static template() {
        return `
            <div class="modal">
                <div class="modal-content">
                    <h4>Omocodie</h4>
                    <p>Seleziona tra i seguenti il codice fiscale corretto</p>
                </div>
                <form action="#">
                    {{each(options.list)}}
                        <p>
                            <label>
                                <input class="with-gap" name="list" type="radio" value="{{@this}}" {{if(@index === 0)}}checked="checked"{{/if}}/>
                                <span>{{@this}}</span>
                            </label>
                        </p>
                    {{/each}}
                </form>
                <div class="modal-footer">
                    <a href="#/list" id="save" class="modal-close waves-effect waves-green btn-flat">Salva</a>
                    <a href="#/generate" class="modal-close waves-effect waves-green btn-flat">Annulla</a>
                </div>
            </div>
        `
    }

    static async render() {
        const session = new Session();
        const people = new People();
        const person = session.getById('person');
        let response = await api.post('/calculate-omocodie', {fiscalCode: person.fiscalCode});
        $('#main-container').innerHTML = Sqrl.Render(this.template(), {
            list: response.list
        });
        const modal = $('.modal');
        M.Modal.init(modal,{
            startingTop: '120%',
            dismissible: false
        });
        M.Modal.getInstance(modal).open();
        $('#save').onclick = () => {
            person.fiscalCode = $('input:checked').value;
            people.insert(person);
            session.deleteById('person');
        };
    }
}
