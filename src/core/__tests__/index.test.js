import { evalEntries,  translateObject, translateArray, 
         applyEntries, translate } from '../index';

// TODO: write tests for objects
describe('evalEntries', () => {
    function inc(acc, coll) {
        const added = coll.map(n => n + 1);
        acc = [...acc, ...added];
        return acc;
    };

    function dec(acc, coll) {
        const subtracted = coll.map(n => n - 1);
        acc = [...acc, ...subtracted];
        return acc;
    };

    let seed = [];

    it('should return null when the functions yield an empty value', () => {
        const fs = [inc, inc];
        const coll = [];

        const actual = evalEntries(seed, fs, coll);

        expect(actual).toEqual(null);
    });

    it('should evaluate functions and return the result', () => {
        const fs = [inc, inc];
        const coll = [2,3,4];

        const actual = evalEntries(seed, fs, coll);

        expect(actual).toEqual([3, 4, 5, 3, 4, 5]);
    });

    it('should evaluate functions in order', () => {
        const fs = [inc, dec];
        const coll = [2,3,4];

        const actual = evalEntries(seed, fs, coll);

        expect(actual).toEqual([3, 4, 5, 1, 2, 3]);
    });
});

describe('applyEntries', () => {
    let tmap = translateObject("a", "foo");
    let fs = [tmap];
    let seed = {};
    let m = { "foo": 1 };

    it('should return results from applying functions', () => {
        const actual = applyEntries(seed, fs)(m);

        expect(actual).toEqual({a: 1});
    });

    it('should merge results when passed multiple inputs arrays', () => {
        const ms = { "bar": 2 };

        const actual = applyEntries(seed, fs)(m, ms);//?

        expect(actual).toEqual([{"a": 1}, null]);
    });
});

describe('translateArray', () => {

    it('should return translation with translate function as a key', () => {
        const resultArray = ["bar", 2]
        const lookupObj = { "foo": 1 };
        const translateFun = 'foo';

        const actual = translateArray(translateFun)(resultArray, lookupObj);

        expect(actual).toEqual(["bar", 2, 1]);
    });

    it('should return translation with translate function as a function', () => {
        const adder = (obj) => obj["foo"] + 1;
        const resultArray = ["bar", 2]
        const lookupObj = { "foo": 1 };
        const translateFun = adder;

        const actual = translateArray(translateFun)(resultArray, lookupObj);

        expect(actual).toEqual(["bar", 2, 2]);
    });

    it('should return null when function yields undefined', () => {
        const translateFun = () => {}; 
        const resultArray = ["bar", 2]
        const lookupObj = { "foo": 1 };

        const actual = translateArray(translateFun)(resultArray, lookupObj);

        expect(actual).toBeNull();
    });

    it('should return null when nothing matches', () => {
        const translateFun = 'buzz'
        const resultArray = [];
        const lookupObj = { "foo": 1 };

        const actual = translateArray(translateFun)(resultArray, lookupObj);

        expect(actual).toBeNull();
    });
});

describe('translateObject', () => {

    it('should return translation with translate function as a key', () => {
        let parentKey = 'a';
        let resultObj = { "bar": 2 };
        let lookupObj = { "foo": 1 };
        const translateFun = 'foo';

        const actual = translateObject(parentKey, translateFun)(resultObj, lookupObj);

        expect(actual).toEqual({"bar": 2, "a": 1});
    });

    it('should return translation with translate function as a function', () => {
        const adder = (obj) => obj["foo"] + 1;
        const parentKey = 'foo';
        let resultObj = { "bar": 2 };
        let lookupObj = { "foo": 1 };
        const translateFun = adder;

        const actual = translateObject(parentKey, translateFun)(resultObj, lookupObj);

        expect(actual).toEqual({"bar": 2, "foo": 2});
    });

    it('should return null when function yields undefined', () => {
        let parentKey = 'a';
        let resultObj = { "bar": 2 };
        let lookupObj = { "foo": 1 };
        const translateFun = () => {}; 

        const actual = translateObject(parentKey, translateFun)(resultObj, lookupObj);

        expect(actual).toBeNull();
    });

    it('should return null when nothing matches', () => {
        let parentKey = 'a';
        let resultObj = { "bar": 2 };
        let lookupObj = { "foo": 1 };
        const translateFun = 'buzz'

        const actual = translateObject(parentKey, translateFun)(resultObj, lookupObj);

        expect(actual).toBeNull();
    });
});

describe('translate', () => {
    let objTransitive = { "a": "foo" };
    let arrTransitive = ["foo"];
    let arg1 = { "foo": 1 };

    it('should return null when transitive is null', () => {
        const actual = translate(null)(arg1);

        expect(actual).toBeNull();
    });
    it('should return null when transitive yeilds null', () => {
        const actual = translate({ "fizz": "buzz" })(arg1);

        expect(actual).toBeNull();
    });

    it('should transform keys for objects', () => {
        const actual = translate(objTransitive, arg1);

        expect(actual).toEqual({"a": 1});
    });

    it('should filter keys for objects', () => {
        objTransitive = {"a": "bar"};

        const actual = translate(objTransitive, arg1);

        expect(actual).toBeNull();
    });

    it('should decorate keys for objects', () => {
        objTransitive = {"a": () => "bar"};
        
        const actual = translate(objTransitive, arg1)

        expect(actual).toEqual({"a": "bar"});
    });

    it('should transform keys for arrays', () => {
        const actual = translate(arrTransitive, arg1);

        expect(actual).toEqual([1])
    });

    it('should filter keys for arrays', () => {
        arrTransitive = ["bar"];
        
        const actual = translate(arrTransitive, arg1);

        expect(actual).toEqual(null);
    });

    it('should decorate keys for arrays', () => {
        arrTransitive = ["foo", 2, 3];

        const actual = translate(arrTransitive, arg1);

        expect(actual).toEqual([1, 2, 3]);
    });

    it('should run with multiple arguments', () => {
        const objTransitive = {"a": "foo"};
        arg1 = { "foo": 1 };
        const arg2 = { "foo": 2 };

        const actual = translate(objTransitive, arg1, arg2);

        expect(actual).toEqual([{"a": 1}, {"a": 2}]);
    });

    it('should translate strings', () => {
        const str = 'foo';
        arg1 = { "foo": 1, "bar": 2 };

        const actual = translate(str, arg1);

        expect(actual).toBe(1);
    });

    it('should translate multiple strings', () => {
        const str = 'foo';
        arg1 = { "foo": 1, "bar": 2 };
        const arg2 = { "foo": 2, "bar": 3 };

        const actual = translate(str, arg1, arg2);

        expect(actual).toEqual([1, 2]);
    });
}); 
