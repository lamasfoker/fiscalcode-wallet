"use strict";

import axios from "axios";

export default class FiscalCodeGenerator{
    async generate(person) {
        let fiscalCode = this.getTokenFromLastName(person.lastName) +
            this.getTokenFromFirstName(person.firstName) +
            this.getTokenFromBirthDateAndGender(person.birthDate, person.isMale) +
            await this.getTokenFromMunicipality(person.municipality);
        fiscalCode += this.getChecksum(fiscalCode);
        return fiscalCode.length === 16 ? fiscalCode : null;
    }

    getTokenFromFirstName(firstName){
        firstName = firstName.trim().toUpperCase();
        if (/^[A-Z ]+$/.test(firstName) === false) {
            return ''
        }
        const firstNameConsonants = firstName.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, "");
        if (firstNameConsonants.length >= 4) {
            //First, third and fourth consonant
            return firstNameConsonants[0] + firstNameConsonants.substr(2, 2);
        } else {
            //First three consonants. If not enough consonants, add the vowels. If not enough, pad with X
            //TODO: replace substr with substring
            const firstNameVowels = firstName.replace(/[^AEIOU]/g, "");
            return (firstNameConsonants + firstNameVowels + "XXX").substr(0, 3);
        }
    }

    getTokenFromLastName(lastName) {
        lastName = lastName.trim().toUpperCase();
        if (/^[A-Z ]+$/.test(lastName) === false) {
            return ''
        }
        const lastNameConsonants = lastName.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/g, "");
        const lastNameVowels = lastName.replace(/[^AEIOU]/g, "");
        //First three consonants. If not enough consonants, add the vowels. If not enough, pad with X
        return (lastNameConsonants + lastNameVowels + "XXX").substr(0, 3);
    }

    getTokenFromBirthDateAndGender(birthDateString, isMale) {
        birthDateString = birthDateString.trim();
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(birthDateString) === false || typeof isMale !== "boolean") {
            return '';
        }
        if (new Date(birthDateString) > new Date()) {
            return '';
        }
        const year = birthDateString.slice(2, 4);
        const month = birthDateString.slice(5, 7);
        let day = birthDateString.slice(8, 10);
        day = isMale ? day : 40 + parseInt(day);
        const monthMap = ' ABCDEHLMPRST';
        return year + monthMap[parseInt(month)] + day;
    }

    async getTokenFromMunicipality(municipality) {
        municipality = municipality.toUpperCase().trim();
        if (/^[A-Z ]+$/.test(municipality.toUpperCase()) === false) {
            return ''
        }
        const url = 'https://www.ilcodicefiscale.it/codici-catastali-comunali.php';
        try {
            let response = await axios.get(url, {
                params: { comune: municipality }
            });
            let body = response.data;
            let matches = body.match(/<h3>([A-Z][0-9]{3})<\/h3>/i);
            return 1 in matches?matches[1]:'';
        } catch (error) {
            return ''
        }
    }

    getChecksum(fiscalCode) {
        const set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const evenSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const oddSet = 'BAKPLCQDREVOSFTGUHMINJWZYX';
        let sum = 0;
        for (let i = 0; i < 15; i++) {
            let charNoDigits = set2[set1.indexOf(fiscalCode[i])];
            if ((i % 2) === 0) {
                sum += oddSet.indexOf(charNoDigits);
            } else {
                sum += evenSet.indexOf(charNoDigits);
            }
        }
        return evenSet[sum % 26];
    }
}
