import { Router, Request, Response,  } from "express";
import { createUser, getAllUsers, getUserById, deleteUser, updateUser, sanitizeUser } from "../services/userServices";


// Users router: handle CRUD for users and always sanitize user objects before sending to clients to avoid leaking sensitive fields.
const router = Router();

// GET /users - returns a list of sanitized users (no password)
router.get("/", (req: Request, res: Response) => {
    const users = getAllUsers();
    const publicUsers = users.map(u => sanitizeUser(u));
    res.json(publicUsers);
});

// GET /users/:id - return a sanitized user or 404
router.get("/:id", (req: Request, res: Response) => {
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json( {mesage: "User not Found"});
    res.json(sanitizeUser(user));
});

// POST /users - create a new user (password hashed, returns sanitized user)
router.post("/", (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password are required' });
    const newUser = createUser(name, email, password);
    res.status(201).json(sanitizeUser(newUser));
});

// PUT /users/:id - update user (password hashed if present)
router.put("/:id", (req: Request, res: Response) => {
    const updatedUser = updateUser(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(sanitizeUser(updatedUser));
});

// DELETE /users/:id - delete user by id (204 on success)
router.delete("/:id", (req: Request, res: Response) =>{
    const deleted = deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not Found"});
    res.status(204).send();
});

export default router;