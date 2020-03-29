"use strict";

import Omocodie from "./Omocodie.js";
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";
import Alert from "../Alert.js";

export default class Save{
    static render() {
        const session = new Session();
        const person = session.getById('person');
        const no = {
            text: 'No',
            handler: () => {
                Omocodie.render();
            }
        };
        const yes = {
            text: 'Sì',
            handler: () => {
                const people = new People();
                people.insert(person);
                session.deleteById('person');
                //TODO: add the fiscal code to the list or refresh the page
            }
        };
        Alert.show({
            header: person.fiscalCode,
            message: 'Il codice indicato è corretto?',
            buttons: [no, yes]
        });
    }
}
