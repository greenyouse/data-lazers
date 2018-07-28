import { _default } from '../default';
import { translate } from '../../core/index';

describe('_default', () => {
    it('should return the default when _or has no match', () => {
        const defaultVal = 2;
        const data = {"bar": 1};

        const actual = translate({"foo": _default(defaultVal, 'fizz', 'buzz')}, data);
        const actual1 = translate({"foo": _default(defaultVal, 'stuff', ['here'])}, data);
        const actual2 = translate({"foo": _default(defaultVal, 'more', {foo: 'foo'})}, data);

        expect(actual).toEqual({"foo": 2})
        expect(actual1).toEqual({"foo": 2})
        expect(actual2).toEqual({"foo": 2})
    });

    it('should return the match from _or', () => {
        const defaultVal = 'foobar';
        const data = {"bar": 1};

        const actual = translate({"foo": _default(defaultVal, 'fizz', 'bar')}, data);
        const actual1 = translate({"foo": _default(defaultVal, 'bar', ['here'])}, data);
        const actual2 = translate({"foo": _default(defaultVal, 'more', {foo: 'bar'})}, data);

        expect(actual).toEqual({"foo": 1});
        expect(actual1).toEqual({"foo": 1});
        expect(actual2).toEqual({"foo": {"foo": 1}});
    });
});
