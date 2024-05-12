const { log, error: logError } = console;

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export { log, logError, classNames };
