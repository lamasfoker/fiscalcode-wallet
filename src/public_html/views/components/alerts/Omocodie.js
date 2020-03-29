"use strict";

const $ = document.querySelector.bind(document);
import Alert from "../Alert.js";
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";
import api from "../../../services/Utils.js";

export default class Omocodie{
    static async render() {
        const session = new Session();
        let person = session.getById('person');
        const save = {
            text: 'Salva',
            handler: () => {
                const people = new People();
                person.fiscalCode = $('.alert-radio-group [aria-checked=true]').innerText;
                people.insert(person);
                session.deleteById('person');
            }
        };
        const cancel = {
            text: 'Annulla'
        };
        let response = await api.post('/calculate-omocodie', {fiscalCode: person.fiscalCode});
        const inputs = response.list.map(fiscalCode => {
            return {
                type: 'radio',
                label: fiscalCode,
                value: fiscalCode
            }
        });
        Alert.show({
            header: 'Omocodie',
            message: 'Seleziona tra i seguenti il codice fiscale corretto',
            buttons: [cancel, save],
            inputs
        });
    }
}
