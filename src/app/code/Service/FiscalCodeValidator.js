"use strict";

import axios from "axios";

export default class FiscalCodeValidator {
    async validate(person, fiscalCode) {
        let message;
        const url = 'https://fiscalcode-validation.unubo.app/';
        const data = {
            fiscalcode: fiscalCode,
            firstname: person.firstName,
            lastname: person.lastName,
            ismale: person.isMale,
            birthdate: person.birthDate,
            municipality: person.municipality
        };
        try {
            let response = await axios.post(url, this.clean(data));
            message = response.data.message;
        } catch (error) {
            message = 'Error Occurred';
        }
        return this.translate(message);
    }

    clean(object) {
        for (let property in object) {
            if (object[property] === null || object[property] === undefined || object[property] === '') {
                delete object[property];
            }
        }
        return object;
    }

    translate(message) {
        const dictionary = {
            'Error Occurred': 'Si è verificato un problema, riprova più tardi!',
            'fiscal code is valid': 'Il Codice Fiscale è Valido',
            'fiscal code present omocodie and can be not valid': 'Il Codice Fiscale presenta omocodie e può non essere valido',
            'municipality does not match with fiscal code': 'Il luogo di nascita non corrisponde',
            'gender does not match with fiscal code': 'Il sesso non corrisponde',
            'birth date is not correct or it does not match with fiscal code': 'La data di nascita non corrisponde',
            'lastname does not match with fiscal code': 'Il Cognome non corrisponde',
            'firstname does not match with fiscal code': 'Il Nome non corrisponde',
            'fiscal code is not valid for omocodie': 'Il Codice Fiscale non è valido',
            'char checksum is not valid': 'Il Codice Fiscale non è valido',
            'fiscal code has chars not valid': 'Il Codice Fiscale non è valido',
            'fiscal code length is not valid': 'Il Codice Fiscale deve essere di 16 caratteri',
            'fiscal code is not present': 'Non è stato inserito nessun Codice Fiscale'
        };
        if (message in dictionary) {
            return dictionary[message];
        }
        return message;
    }
}
