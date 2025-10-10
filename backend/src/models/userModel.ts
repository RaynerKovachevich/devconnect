// User model: `password` stores a hash (never plain text). Consider renaming timestamps to createdAt/updatedAt.
export interface User {
    id: string;
    name: string;
    email: string;
    // Stored as a password hash — never store plain-text passwords
    password: string;
    role: "user" | "admin";
    createAt: Date;
    updateAt: Date;
}