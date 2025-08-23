const crypto = require('crypto');

// Log the SECRET_KEY to check if it's being loaded correctly
console.log('eW91ci1zZWNyZXQta2V5:', process.env.SECRET_KEY);

const algorithm = 'aes-256-cbc'; // Encryption algorithm
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

const keyBuffer = Buffer.from(secretKey, 'base64'); // Convert from base64

// Encrypt function
const encryptField = (text) => {
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
};

// Decrypt function
const decryptField = (encryptedData, iv) => {
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encryptField, decryptField };
