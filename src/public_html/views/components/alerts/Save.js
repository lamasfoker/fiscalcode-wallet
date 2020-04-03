"use strict";

import Omocodie from "./Omocodie.js";
import People from "../../../models/People.js";
import Session from "../../../models/Session.js";
import Alert from "../Alert.js";
import List from "../../pages/List.js";

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
                List.render();
            }
        };
        Alert.show({
            header: person.fiscalCode,
            message: 'Il codice indicato è corretto?',
            buttons: [no, yes]
        });
    }
}
