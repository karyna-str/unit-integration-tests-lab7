const add = require('../src/math');

test('Додавання чисел', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
});
