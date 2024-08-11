import { CONTACT_TYPE } from '../constants/constants.js';

const parseType = (unknown) => {
  if (typeof unknown !== 'string') {
    return undefined;
  }
  if (
    [CONTACT_TYPE.WORK, CONTACT_TYPE.HOME, CONTACT_TYPE.PERSONAL].includes(
      unknown,
    )
  ) {
    return unknown;
  }
  return undefined;
};

const parseIsFavourite = (unknown) => {
  if (typeof unknown !== 'string') {
    return undefined;
  }

  if (['true', 'false'].includes(unknown)) {
    return unknown;
  }

  unknown === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedType = parseType(type);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
