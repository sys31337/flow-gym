export const generateAvatarLetters = (inputString: string) => {
  const words = inputString.split(' ');
  const firstLetters = words.map((word: string) => word.charAt(0));
  const result = firstLetters.join('');
  return result;
};

export const isEmail = (email: string) => {
  const re = /^[\w\\.%\\+\\-]+@[a-z0-9.-]+\.(com|net|fr)$/i;
  return re.test(email);
};

export const isValidUrl = (url: string) => {
  try {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  } catch (error) {
    return false;
  }
};
