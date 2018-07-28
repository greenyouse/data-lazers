import { _equals } from '../equals';
import { translate } from '../../core/index';

describe('_equals', () => {
    let data;
    beforeEach(() => {
        data = { "bar": 1 };
    });

    it('should be true when all items are equal', () => {
        const actual = translate({ "foo": _equals('bar', 'bar') }, data);
        const actual1 = translate({ "foo": _equals({ 1: 'bar' }, { 1: 'bar' }) }, data);
        const actual2 = translate({ "foo": _equals([1, 2, 3], [1, 2, 3]) }, data);

        expect(actual).toEqual({ "foo": true });
        expect(actual1).toEqual({ "foo": true });
        expect(actual2).toEqual({ "foo": true });
    });

    it('should be false when any items are not equal', () => {
        const actual = translate({ "foo": _equals(1, 2) }, data);
        const actual1 = translate({ "foo": _equals({ 1: 'foo' }, { 1: 'bar' }) }, data);
        const actual2 = translate({ "foo": _equals('foo', 'bar') }, data);

        expect(actual).toEqual({ "foo": false });
        expect(actual1).toEqual({ "foo": false });
        expect(actual2).toEqual({ "foo": false });
    });
});
