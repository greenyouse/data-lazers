/**
 * Pipes a value through successive functions. The
 * first expression should be a string to pull
 * the value out.
 * 
 * @example
 * translate({foo: _pipe('bar', n => n + 1, n => n * 10, n => n - 1)}, {bar: 1});
 * // => {"foo": 19}
 * 
 * @param {*} exprs The expressions to pipe through
 */
export function _pipe (...exprs) {
    return function (data) {
        if (exprs.length === 0) return null;

        return exprs.reduce((acc, f, _, array) => {
            if (acc === null || acc === undefined) {
                array.splice(0);
                return null;
            }
            if (typeof f === 'string') {
                return acc[f] || null;
            }

            return f(acc);
        }, data);
    }
};
