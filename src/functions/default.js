import { _or } from './or';
import { notEmpty } from '../core/helpers';

/**
 * Returns a default value if none of the expressions
 * return values. It uses _or and therefore returns
 * the first non-null value.
 * 
 * @example
 * translate({foo: _default(0, 'fizz', {buzz: 'bar'})}, {bar: 1})
 * // => {"foo": {"buzz": 1}}
 * 
 * @param {*} defaultVal Fallback or default value
 * @param {*} exprs Transitive expressions to evaluate
 */
export function _default (defaultVal, ...exprs) {
    return function (data) {
        const result = _or.apply(null, exprs)(data);        
        if (notEmpty(result) !== null) {
            return result;
        } else {
            return defaultVal;
        }
    }
}
