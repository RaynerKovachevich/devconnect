import { User } from "../models/userModel";

// Remove sensitive fields from a User before returning to clients.
export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...publicUser } = user;
  return publicUser as Omit<User, 'password'>;
};

export default sanitizeUser;
