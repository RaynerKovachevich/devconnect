import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export interface TokenPayload {
  id: number;
  role: string;
  iat?: number;
  exp?: number;
}

export const signToken = (payload: Pick<TokenPayload, 'id' | 'role'>, expiresIn = '1h'): string => {
  const opts: SignOptions = { expiresIn: expiresIn as any };
  const secret: Secret = JWT_SECRET as Secret;
  return jwt.sign(payload as object, secret, opts);
};

export const verifyToken = (token: string): TokenPayload => {
  const secret: Secret = JWT_SECRET as Secret;
  return jwt.verify(token, secret) as TokenPayload;
};

export default { signToken, verifyToken };
