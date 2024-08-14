const { log, error: logError } = console;

const compareArrays = (a: string[], b: string[]) => a.length === b.length && a.every((element) => b.indexOf(element) > -1);

export { log, logError, compareArrays };
