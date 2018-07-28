import { translate } from '../core/index';

/**
 * Evalutes predicate and if it returns logical 
 * true, _then is evaluated and returned.
 * 
 * @example
 *  translate({foo: _when('bar', {nested: 'bar'})}, {bar: 1})//?
 * // => {foo: {nested: 1}}
 * 
 * @param {function} predicate Logical predicate to test with
 * @param {*} _then Expression to evalute when true
 */
export function _when (predicate, _then) {
    return function (data) {
        const result = translate(predicate, data)
        if (result !== null && result !== undefined && result) {
            return translate(_then, data);
        } 
        return null;
    }
}
