import { _or } from '../or';
import { translate } from '../../core';
import { _pipe } from '../pipe';

describe('or', () => {
    let data = {"bar": 1};

    it('should return null when nothing matches', () => {
        const transitive = {"foo": _or('baz', 'qux')};

        const actual = translate(transitive, data);

        expect(actual).toBeNull();
    });

    it('should return a match', () => {
        const transitive = {"foo": _or('baz', 'qux', 'bar')};

        const actual = translate(transitive, data);

        expect(actual).toEqual({"foo": 1});
    });

    it('should return return the first match', () => {
        const transitive = {"foo": _or('baz', 'qux', 'bar', 'bar')};

        const actual = translate(transitive, data);

        expect(actual).toEqual({"foo": 1});
    });
});
