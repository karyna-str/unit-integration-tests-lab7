function parseCurrency(value) {
    return parseFloat(value.replace('$', ''));
}

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function addCurrencies(value1, value2) {
    const num1 = parseCurrency(value1);
    const num2 = parseCurrency(value2);
    const sum = num1 + num2;
    return formatCurrency(sum);
}

module.exports = { parseCurrency, formatCurrency, addCurrencies };
