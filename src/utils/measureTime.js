function measureTime(fn) {
    return async function (...args) {
        console.log("measure")
        const start = process.hrtime.bigint();
        const result = await fn(...args);
        const end = process.hrtime.bigint();

        const duration = (end - start) / BigInt(1e6);
        console.log(`Tiempo de ejecución: ${duration} ms`);

        return result;
    };
}

export default measureTime