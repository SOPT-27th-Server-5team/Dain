const calculatorModule = require('./calculator');

const a = 21;
const b = 3;

console.log(`a + b = ${calculatorModule.add(a,b)}`);
console.log(`a - b = ${calculatorModule.substract(a,b)}`);
console.log(`a * b = ${calculatorModule.multiply(a,b)}`);
console.log(`a / b = ${calculatorModule.divide(a,b)}`);