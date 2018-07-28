import { translate } from '../core/index';
import { equal } from '../core/helpers';

/**
 * @private
 * @param {*} f 
 * @param {*} data 
 */
function applyTransitive(f, data) {
    switch (typeof f) {
        case 'function':
            return f(data);
        case 'string':
            return data[f];
        case 'number':
            return data[f];
        default:
            return null;
    }
}

/**
 * Returns true when the transitives return the
 * same value.
 * 
 * @example
 * translate({foo: _equals('bar', 1)}, {bar: 1})//?
 * // => {"foo": true}
 * 
 * @param {*} transitives Transitive expressions to check
 */
export function _equals(...transitives) {
    const fs = transitives.map(transitive => translate(transitive));
    return function (data) {
        const referenceValue = applyTransitive(fs[0], data);
        return fs.every(transitive => equal(referenceValue, applyTransitive(transitive, data)));
    }
}
