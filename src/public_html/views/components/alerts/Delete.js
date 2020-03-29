"use strict";

import People from "../../../models/People.js";
import Session from "../../../models/Session.js";
import Alert from "../Alert.js";

export default class Delete{
    static render() {
        const session = new Session();
        const people = new People();
        const personId = session.getById('person-to-delete');
        const person = people.getById(personId);
        const no = {
            text: 'No',
        };
        const yes = {
            text: 'Sì',
            handler: () => {
                people.deleteById(personId);
            }
        };
        Alert.show({
            header: 'Attenzione',
            message: `Vuoi davvero eliminare le informazioni salvate su ${person.firstName} ${person.lastName}?`,
            buttons: [no, yes]
        });
    }
}
