import { _pipe } from '../pipe';
import { translate } from '../../core/index';

describe('or', () => {
    const data = { "bar": 1 };

    it('should return null when lookup is empty', () => {
        const transitive = {"foo": _pipe()};

        const actual = translate(transitive, data);

        expect(actual).toBeNull();
    });

    it('should return the result of applying a function', () => {
        const transitive = {"foo": _pipe('bar')};

        const actual = translate(transitive, data);

        expect(actual).toEqual({"foo": 1});
    });
    it('should return null when function result is null', () => {
        const transitive = {"foo": _pipe('foo')};

        const actual = translate(transitive, data);

        expect(actual).toBeNull();
    });

    it('should return the result of successive functions', () => {
        const inc = (n) => n + 1;
        const transitive = {"foo": _pipe('bar', inc)};

        const actual = translate(transitive, data);

        expect(actual).toEqual({"foo": 2});
    });

    it('should return null when any function in chain returns null', () => {
        const inc = (n) => n + 1;
        const transitive = {"foo": _pipe('bar', inc, 'foo', 'fizz', 'buzz')};

        const actual = translate(transitive, data);

        expect(actual).toBeNull();
    });
});
