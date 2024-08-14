import { customAlphabet } from 'nanoid';
import Club from '@api/models/club';

export const createClub = async (userName: string) => {
  const clubName = userName.trim().replace(/ +/g, '_').replace(/[^a-zA-Z_]+/g, '').toLowerCase();
  let name = '';
  let duplicated = true;
  while (duplicated) {
    const id = customAlphabet('1234567890', 4);
    name = `${clubName}_${id()}`;
    // eslint-disable-next-line no-await-in-loop
    const isDuplicated = await Club.findOne({ name });
    if (!isDuplicated) duplicated = false;
  }
  const club = await new Club({ name, tagline: 'Just another new club' }).save();
  return club;
};

export const holder = '';
