import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import prisma from "../prisma";
import { sanitizeUser } from "../utils/sanitize";

// Create a new user in the database. Password is hashed before storing.
export const createUser = async (name: string | null, email: string, password: string): Promise<User> => {
    const hashed = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({
        data: {
            name: name ?? null,
            email,
            password: hashed,
            // role defaults to 'user' in our app logic; Prisma model doesn't set a default
            // so we set it here.
            // Note: if your Prisma model has a role enum/default, adjust accordingly.
            // For now we use a string field in TS model.
        },
    });

    // Map Prisma user to our domain User interface
    return mapPrismaUser(created);
};

// Authenticate credentials: return User if valid, otherwise null
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) return null;
    const match = await bcrypt.compare(password, found.password);
    if (!match) return null;
    return mapPrismaUser(found);
};

// Note: sanitizeUser is provided by src/utils/sanitize.ts to keep a single canonical implementation.

export const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany();
    return users.map(mapPrismaUser);
}

export const getUserById = async (id: number): Promise<User | null> => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? mapPrismaUser(user) : null;
};

// Update an existing user: apply changes, hash password if included, and set update timestamp.
export const updateUser = async (
    id: number,
    updates: Partial<Omit<User, "id" | "createdAt">>
): Promise<User | null> => {
    const data: any = { ...updates };
    if (typeof data.password === 'string') {
        data.password = await bcrypt.hash(data.password, 10);
    }

    try {
        const updated = await prisma.user.update({ where: { id }, data });
        return mapPrismaUser(updated);
    } catch (err) {
        // If user not found or other error, return null for controller to handle 404
        return null;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await prisma.user.delete({ where: { id } });
        return true;
    } catch (err) {
        return false;
    }
};

// Helper: map Prisma user to local User interface
const mapPrismaUser = (p: any): User => ({
    id: p.id,
    name: p.name,
    email: p.email,
    password: p.password,
    role: (p as any).role ?? 'user',
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
});
