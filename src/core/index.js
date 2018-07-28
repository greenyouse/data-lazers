import { notEmpty, type } from './helpers';

//...dragons ...dragons everywhere  (/￣ー￣)/‥∵:*:☆*゜★。：：＊☆
// TODO: slay dragons... refactor everything!
/**
 * @private
 * @param {*} seed starting value to build upon
 * @param {Array<Function>} fs array of functions to apply
 * @param {*} coll some collection of data
 */
export function evalEntries(seed, fs, coll) {
    // don't mutate the current seed value
    let seedCopy;
    if (Array.isArray(seed)) {
        seedCopy = [...seed];
    } else {
        seedCopy = Object.assign({}, seed);
    } 
    const applied = fs.reduce((acc, f) => {
        return f(acc, coll) || acc;
    }, seedCopy);
    return notEmpty(applied);
}

/**
 * @private
 * @param {*} seed starting value
 * @param {Array<Function>} fs array of functions to apply
 */
export function applyEntries (seed, fs) {
    return function (m, ...ms) {
        if (notEmpty(ms)) {
            const merged = [m, ...ms];
            return merged.map(entry => evalEntries(seed, fs, entry));
        } else {
            return evalEntries(seed, fs, m);
        }
    }
}

/**
 * @private
 * @param {*} translateFun some key or function to apply
 */
export function translateArray(translateFun) {
    return function (resultArray, lookupObj) {
        if (lookupObj.hasOwnProperty(translateFun)) {
            // when the translate function is a key, do a lookup
            const result = lookupObj[translateFun];
            resultArray.push(result);
            return resultArray;
        } else if (typeof translateFun === 'function') {
            const result = translateFun(lookupObj);
            // make sure applying the function yields a result
            if (result !== undefined &&
                result !== null &&
                (Array.isArray(result) === false || 
                result !== [])) {
                resultArray.push(result);
                return resultArray;
            } else {
                return null;
            }
        } else {
            // filter the result if it doesn't match
            return null;
        }
    }
}

/**
 * @private
 * @param {!String} parentKey parent key of the value being transformed
 * @param {*} translateFun some key or function to apply
 */
export function translateObject (parentKey, translateFun) {
    return function (resultObj, lookupObj) {
        if (lookupObj.hasOwnProperty(translateFun)) {
            // when the translate function is a key, do a lookup
            const result = lookupObj[translateFun];
            resultObj[parentKey] = result;
            return resultObj;
        } else if (typeof translateFun === 'function') {
            const result = translateFun(lookupObj);
            // make sure applying the function yields a result
            if (result !== undefined &&
                result !== null &&
                (type(result) !== 'Object' ||
                notEmpty(result))) {
                resultObj[parentKey] = result;
                return resultObj;
            } else {
                return null;
            }
        } else {
            // filter the result if it doesn't match
            return null;
        }
    }
}

/**
 * Translates a data structure using by filtering, decorating,
 * and transforming values of the data. 
 * 
 * The transitive provides a mapping between the input and 
 * output data. Keys in the transitives are used similar to ES6
 * destructuring assignment to pull values out of input data.
 * 
 * When given only a transitive (no data collections), a partially
 * applied translate is returned.
 * 
 * @example
 * translate({foo: 'bar'}, {bar: 1})
 * // => {foo: 1}
 *
 * @example
 * translate(['bar', 1, 'baz', 2], {bar: 0, foo: 3});
 * // => [0, 1, 2]
 * 
 * @param {*} transitive data that maps input data to output data
 * @param {*} coll some collection to transform
 * @param {*} colls multiple collections to transform
 */
export function translate (transitive, coll, ...colls) {
    if (colls.length > 0) {
        const merged = [coll, ...colls];
        if (type(transitive) === 'String') {
            return merged.map((coll) => translate(transitive, coll));
        }
        const tf = translate(transitive);
        return tf.apply(null, merged); 
    }

    if (coll) {
        // TODO: clean up
        // handle edge cases for coll
        if (coll === null || coll === undefined) {
            return null;
        }

        // one more edge case, refactor this too
        return typeof transitive === 'string' ? coll[transitive] : translate(transitive)(coll);
    };

    switch(type(transitive)) {
        case 'Object':
            // TODO: break this up with a helper fn
            transitive = Object.entries(transitive);
            const entries = transitive.map(t => {
                const [k, v] = t;
                return translateObject(k, translate(v));
            });
            return applyEntries({}, entries); 
        case 'Array':
            return applyEntries([], transitive.map(t => translateArray(translate(t))));
        case 'Function':
            return transitive;
        case 'String':
            return transitive;
        default:
            return () => (transitive); 
    }    
}
