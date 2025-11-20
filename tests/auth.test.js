const isPasswordValid = require('../src/auth');

test('Перевірка валідності пароля', () => {
    expect(isPasswordValid('password123')).toBe(true);
    expect(isPasswordValid('short')).toBe(false);
});
