"use strict";

import FiscalCodeGenerator from "./FiscalCodeGenerator";

export default class OmocodieCalculator{
    calculate(fiscalCode) {
        const map = 'LMNPQRSTUV';
        const fiscalCodeGenerator = new FiscalCodeGenerator();
        let list = [];
        for (let i = 0; i < 7; i++) {
            let modified = fiscalCode.slice(0, -1).split('');
            let positions = [14, 13, 12, 10, 9, 7, 6].splice(0, i+1);
            for (let position of positions) {
                modified[position] = map[modified[position]];
            }
            modified = modified.join('');
            list.push(modified+fiscalCodeGenerator.getChecksum(modified))
        }
        return list;
    }
}
