import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

const getSecretKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) throw new Error('ENCRYPTION_KEY environment variable is missing');
  // Assuming the key is provided as a 64-character hex string (32 bytes)
  if (key.length !== 64) throw new Error('ENCRYPTION_KEY must be a 64-character hex string');
  return Buffer.from(key, 'hex');
};

export function encrypt(text: string): string {
  if (!text) return text;
  
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getSecretKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Return the IV and the encrypted data joined by a colon
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string {
  if (!text) return text;
  
  try {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift() as string, 'hex');
    const encryptedText = parts.join(':');
    
    const decipher = crypto.createDecipheriv(algorithm, getSecretKey(), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return 'Decryption Error';
  }
}
