"use strict";

import Alert from "../Alert.js";
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";
import {post, $} from "../../../services/Utils.js";
import List from "../../pages/List.js";

export default class Omocodie{
    static async render() {
        //TODO: fiscal code in small device can be hidden
        const session = new Session();
        let person = session.getById('person');
        const save = {
            text: 'Salva',
            handler: () => {
                const people = new People();
                person.fiscalCode = $('.alert-radio-group [aria-checked=true]').innerText;
                people.insert(person);
                session.deleteById('person');
                List.render();
                $('ion-tabs').select('list');
            }
        };
        const cancel = {
            text: 'Annulla'
        };
        let response = await post('/calculate-omocodie', {fiscalCode: person.fiscalCode});
        const inputs = response.list.map(fiscalCode => {
            return {
                type: 'radio',
                label: fiscalCode,
                value: fiscalCode
            }
        });
        inputs[0].checked = true;
        Alert.show({
            header: 'Omocodie',
            message: 'Seleziona tra i seguenti il codice fiscale corretto',
            buttons: [cancel, save],
            inputs
        });
    }
}
