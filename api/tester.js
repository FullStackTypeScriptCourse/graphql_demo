// decorator example
const logger = (message) => console.log(message)

function loggerDecorator (cb) {
    return function (message) {
        cb.call(this, message)
        console.log("message logged at:", new Date().toLocaleString())
    }
}

const decoratedLogger = loggerDecorator(logger);
decoratedLogger("Hello World");