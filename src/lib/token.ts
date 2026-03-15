import jwt from 'jsonwebtoken';

const SECRET = 'dev-secret-key';

export const tokenLib = {
  generateToken(userId: string, email: string) {
    return jwt.sign({ sub: userId, email }, SECRET, { expiresIn: '7d' });
  },
};
