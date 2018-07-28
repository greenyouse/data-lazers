import { translate } from '../../core/index';
import { _format } from '../format';

describe('format', () => {
    let arrayTemplate;
    let objTemplate;

    beforeEach(() => {
        arrayTemplate = _format`${0} it ${1}.`;
        objTemplate = _format`${'foo'} are only ${'bar'} until ${'baz'}`;
    }); 

    it('should return the string on no match', () => {
        const data = {'a': 'b', 'qux': 'qux'};

        const actual = objTemplate(data);

        expect(actual).toBe(' are only  until ');
    });

    it('should match array arguments', () => {
        const data = ['Make', 'so'];

        const actual = arrayTemplate(data);

        expect(actual).toBe('Make it so.');
    });

    it('should match object arguments', () => {
        const data = {"foo": 'Things', "bar": 'impossible', "baz": 'they\'re not!'};

        const actual = objTemplate(data);

        expect(actual).toBe('Things are only impossible until they\'re not!');
    });

    it('should match with translate', () => {
        const nullData = {'a': 'b', 'qux': 'qux'};
        const arrayData = ['Make', 'so'];
        const objectData = {"foo": 'Things', "bar": 'impossible', "baz": 'they\'re not!'};

        const actual1 = translate({ 'foo': objTemplate}, nullData);
        const actual2 = translate({ 'foo': arrayTemplate}, arrayData);
        const actual3 = translate({ 'foo': objTemplate}, objectData);

        expect(actual1).toEqual({"foo": ' are only  until '});
        expect(actual2).toEqual({"foo": 'Make it so.'});
        expect(actual3).toEqual({"foo": 'Things are only impossible until they\'re not!'});
    });
});
