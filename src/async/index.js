const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
        ? setTimeout(() => resolve('Do something Async'), 3000)
        : reject(new Error('Test Error'))
    })
}

const doSomething = async () => {
    const something = await doSomethingAsync(); //Esperar a la promesa
    console.log(something + '1');
}

console.log('Before');
doSomething();
console.log('After');

//Con manejo de errores, mejor
const anotherFunction = async () => {
    try {
        const something = await doSomethingAsync();
        console.log(something + '2');
    } catch {
        console.error(error);
    }
}

console.log('Before 2');
anotherFunction();
console.log('After 2');

