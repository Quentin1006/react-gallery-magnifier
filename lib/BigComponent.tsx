import moment from 'moment';
import lodash from 'lodash-es';

export const BigComponent = () => {
  const now = moment();
  const a = { a: 1, b: 2 };
  const aa = lodash.get(a, 'a.a');
  const b = lodash.get(a, 'a.b');

  return { a, aa, b, now };
};
