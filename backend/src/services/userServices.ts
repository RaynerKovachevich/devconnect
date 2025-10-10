import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// Service layer (in-memory): handles user creation, password hashing and basic CRUD. Replace with DB in production.
// NOTE: This store is ephemeral and will be lost when the process restarts.
let users: User[] = [];

export const createUser = (name: string, email: string, password: string): User => {
    const newUser: User = {
        id: randomUUID(),
        name,
        email,
    // Hash password synchronously for simplicity (consider async in prod).
    password: bcrypt.hashSync(password, 10),
        role: "user",
    // Timestamps (consider renaming to createdAt/updatedAt later)
    createAt: new Date(),
    updateAt: new Date(),
    };

    users.push(newUser);
    return newUser;
};

// Remove sensitive fields (like password) before returning users to clients.
export const sanitizeUser = (user: User): Omit<User, 'password'> => {
    const { password, ...publicUser } = user;
    return publicUser as Omit<User, 'password'>;
};

export const getAllUsers = (): User[] => {
    return users;
}

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};

// Update an existing user: apply changes, hash password if included, and set update timestamp.
export const updateUser = (
    id: string,
    updates: Partial<Omit<User, "id" | "createAt">>
): User | undefined => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return undefined;

    const appliedUpdates: Partial<User> = { ...(updates as Partial<User>) };

    // If password is present in updates, hash it before saving.
    if (typeof appliedUpdates.password === 'string') {
        appliedUpdates.password = bcrypt.hashSync(appliedUpdates.password, 10);
    }

    users[index] = {
        ...users[index],
        ...appliedUpdates,
        updateAt: new Date(),
    };

    return users[index];
};

export const deleteUser = (id: string): boolean => {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return users.length < initialLength;
};
