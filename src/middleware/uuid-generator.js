import {randomBytes} from 'crypto';

function generateUUID(message) {
  return randomBytes(16).toString('hex');
}

export default generateUUID;
