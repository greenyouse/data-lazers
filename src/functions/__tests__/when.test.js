import { _when } from '../when';
import { translate } from '../../core';

describe('_when', () => {
    let pred;
    let _then;

    beforeEach(() => {
        pred = {"foo": "bar"};
        _then = {"fizz": "bar"}
    });

    it('should return null when predicate fails', () => {
        const data = [];
        const data1 = {};
        const data2 = {"fizz": 'bar'};

        const f = data => translate({foo: _when(pred, _then)}, data);
        const actual = f(data);
        const actual1 = f(data1);
        const actual2 = f(data2);

        expect(actual).toBeNull();
        expect(actual1).toBeNull();
        expect(actual2).toBeNull();
    })

    it('should return then when predicate succeeds', () => {
        const data = {"bar": 1};
        const data1 = {"bar": 'bar'};

        const f = data => translate({foo: _when(pred, _then)}, data);
        const actual = f(data);
        const actual1 = f(data1);

        expect(actual).toEqual({foo: {"fizz": 1}});
        expect(actual1).toEqual({foo: {"fizz": 'bar'}});
    })
});
