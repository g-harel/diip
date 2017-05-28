const diip = require('./index');

describe('diip', () => {
    it('returns a function', () => {
        expect(diip).toBeInstanceOf(Function);
    });

    it('returns null when values are equal', () => {
        expect(diip(0, 0)).toBe(null);
        expect(diip('a', 'a')).toBe(null);
        expect(diip(null, null)).toBe(null);
        expect(diip(undefined, undefined)).toBe(null);
    });

    it('checks for deep equality', () => {
        expect(diip({}, {})).toBe(null);
        expect(diip([], [])).toBe(null);
        expect(diip({a: 0, b: 1}, {a: 0, b: 1})).toBe(null);
        expect(diip([0, 1, 2, 3], [0, 1, 2, 3])).toBe(null);
        expect(diip([{a: 0}, {b: [0, 1, 2]}], [{a: 0}, {b: [0, 1, 2]}])).toBe(null);
    });

    it('returns an array when a difference is found', () => {
        expect(diip(0, 1)).toBeInstanceOf(Array);
        expect(diip('a', 'b')).toBeInstanceOf(Array);
    });

    it('can compare between types', () => {
        expect(diip(0, '0')).toBeInstanceOf(Array);
        expect(diip(0, null)).toBeInstanceOf(Array);
    });

    it('returns an array of the addresses of each change', () => {
        expect(diip(0, null)).toMatchObject([[]]);
        expect(diip([0], ['test'])).toMatchObject([['0']]);
        expect(diip({a: undefined}, {a: 1})).toMatchObject([['a']]);
        expect(diip([{a: 0}, {b: [0, 1, 3]}], [{a: 0}, {b: [0, 1, 2]}]))
            .toMatchObject([['1', 'b', '2']]);
        expect(diip([{a: 0}, {b: [null, 1, 2]}], [{a: true}, {b: [0, 1, 2]}]))
            .toMatchObject([['0', 'a'], ['1', 'b', '0']]);
    });
});
