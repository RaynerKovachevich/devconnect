import { signToken } from './auth';

// generateToken accepts user id and role (role optional) and returns JWT
export const generateToken = (userId: number, role: string = 'user') => {
  return signToken({ id: userId, role });
};

export default { generateToken };
