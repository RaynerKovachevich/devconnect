// Lightweight DTO used for documentation purposes.
// Controllers perform simple manual validation, so this type
// exists to share the expected shape across the codebase.
export interface CreateUserDto {
    name?: string | null;
    email: string;
    password: string;
}
