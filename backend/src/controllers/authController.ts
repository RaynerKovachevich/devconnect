import { Router, Request, Response } from 'express';
import { authenticateUser, createUser } from '../services/userServices';
import { signToken } from '../utils/auth';
import sanitizeUser from '../utils/sanitize';

const router = Router();

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await authenticateUser(email, password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user.id, role: user.role });
  res.json({ token, user: sanitizeUser(user) });
});

// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password required' });
  }

  const newUser = await createUser(name ?? null, email, password);
  const token = signToken({ id: newUser.id, role: newUser.role });
  res.status(201).json({ token, user: sanitizeUser(newUser) });
});

export default router;
