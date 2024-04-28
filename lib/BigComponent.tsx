import moment from 'moment';
import lodash from 'lodash-es';

export const BigComponent = () => {
  const now = moment();
  const a = { a: 1 };
  const aa = lodash.get(a, 'a.a');

  return { a, aa, now };
};
