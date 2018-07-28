/**
 * @private
 * @param {Array<string>} strings 
 * @param {Array<string=>} keys 
 */
function template(strings, keys) {
    return function (data) {
        const result = keys.reduce((acc, key, index) => {
            // lookup the key from the object passed in
            const value = data[key] || '';
            // add matching value to acc, interleaving between strings
            acc.splice(2 * index + 1, 0, value);
            return acc;
        }, [...strings])
        return result.join('');
    };
}

/**
 * String formatting function that can pull values
 * from an array using numbers for lookups or pull
 * values from an object using keys for lookups.
 * 
 * Note that this is a tagged template function
 * and should be called with ES6 backticks. See
 * the examples funcitons for reference or
 * [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
 * 
 * @example
 * const objectData = {'foo': 'world'};
 * translate({ 'foo': _format`hello ${'foo'}`}, objectData);
 * // => {"foo": "hello world"}
 * 
 * @example
 * const arrayData = ['hello', 'world'];
 * translate({ 'foo': _format`${0} ${1}`}, arrayData);
 * // => {"foo": "hello world"}
 * 
 * @param {Array<Strings>} strings 
 * @param {Array<string=|number=>} keys 
 */
export function _format (strings, ...keys) {
    const f = template(strings, keys);
    return function (data) {
        return f(data);
    }
}
