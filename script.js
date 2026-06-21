import crypto from 'crypto';

const users = ['steudoc', 'mario.rossi', 'luigi.bianchi', 'osv', 'SimplePlayer', 'john.doe', 'julia', 'silve'];

users.forEach(username => {
  const salt = crypto.randomBytes(16).toString('hex');
  const password = 'password'; // stessa password per tutti
  const hash = crypto.scryptSync(password, salt, 32).toString('hex');
  console.log(`${username} | hash: ${hash} | salt: ${salt}`);
});