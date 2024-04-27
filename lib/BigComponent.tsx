import * as moment from 'moment';
import * as lodash from 'lodash';

export const BigComponent = () => {
  const now = moment();
  const a = { a: 1 };
  const aa = lodash.get(a, 'a.a');

  return { a, aa, now };
};
