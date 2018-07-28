import { notEmpty, type } from '../helpers';

describe('notEmpty', () => {
    it('should return null when passed null', () => {
        const coll = null;

        const actualColl = notEmpty(coll);

        expect(actualColl).toBeNull();
    });

    it('should return null for empty values', () => {
        const arr = [];
        const obj = {};

        const actualArr = notEmpty(arr);
        const actualObj = notEmpty(obj);

        expect(actualArr).toBeNull();
        expect(actualObj).toBeNull();
    });

    it('should return the value when not empty', () => {
        const arr = [1, 2, 3];
        const obj = {"foo": "bar"};

        const actualArr = notEmpty(arr);
        const actualObj = notEmpty(obj);

        expect(actualArr).toBe(arr);
        expect(actualObj).toBe(obj);
    });

    it('should return the value for non-collections', () => {
        const str = 'foobar';
        const int = 1;

        const actualStr = notEmpty(str);
        const actualInt = notEmpty(int);

        expect(actualStr).toBe(str);
        expect(actualInt).toBe(int);
    })
});

describe('type', () => {
    it('should detect undefined', () => {
        const data = undefined;

        const actual = type(data);

        expect(actual).toBe(undefined);
    });

    it('should detect null', () => {
        const data = null;

        const actual = type(data);

        expect(actual).toBe(null);

    });

    it('should detect numbers', () => {
        const data = 1;

        const actual = type(data);

        expect(actual).toBe('Number');
    });

    it('should detect strings', () => {
        const data = 'foo';

        const actual = type(data);

        expect(actual).toBe('String');

    });

    it('should detect booleans', () => {
        const data = true;

        const actual = type(data);

        expect(actual).toBe('Boolean');
    });

    it('should detect arrays', () => {
        const data = [1,2,3];

        const actual = type(data);

        expect(actual).toBe('Array');
    });

    it('should detect objects', () => {
        const data = {"foo": 'bar'};

        const actual = type(data);

        expect(actual).toBe('Object');
    });
});
