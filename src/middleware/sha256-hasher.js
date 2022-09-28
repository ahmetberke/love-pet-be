import {createHash} from 'crypto';

function hash(message) {
  return createHash('sha256').update(message).digest('hex');
}

export default hash;
