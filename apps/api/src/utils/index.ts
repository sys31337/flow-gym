const { log, error: logError } = console;

const hideEmail = (text: string) => (text.replace(
  /(.{2})(.*)(?=@)/,
  (_gp1, gp2, gp3) => {
    let result = gp2;
    const lastTwo = gp3.slice(-2);
    for (let i = 0; i < gp3.length - 2; i += 1) {
      result += '*';
    } return `${result}${lastTwo}`;
  },
));

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const quickUid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const uuid = () => {
  const characters = '1234567890abcdef';
  let token = '';

  for (let i = 0; i < 32; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  let i = 0;
  const v = token.toString();
  const pattern = '########-####-####-####-############';

  return pattern.replace(/#/g, () => {
    i += 1;
    return v[i - 1];
  });
};

export {
  log, logError, hideEmail, randomInt, uuid, quickUid,
};
