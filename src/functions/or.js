import { translate } from '../core/index';

/**
 * Converts all arguments to transitives and
 * returns the first non-null value.
 * 
 * @example
 * translate({foo: _or('baz', 'qux', 0, 'bar')}, {bar: 1});//?
 * // => {"foo": 0}
 * 
 * @param {*} exprs The transitive expressions to evaluate
 */
export function _or (...exprs) {
    return function (data) {
        return exprs.reduce((acc, expr, _, array) => {
            const result = translate(expr, data);
            // short circut the reduce function
            if (result !== null && result !== undefined) {
                array.splice(0);
                return result;
            }
            return acc;
        }, {});
    }
}
