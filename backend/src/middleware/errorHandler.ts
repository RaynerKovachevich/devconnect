import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    // Prisma known errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            return res.status(409).json({ message: 'Duplicate record' });
        }
    }

    // JWT errors
    if (err?.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (err?.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }

    res.status(500).json({ message: 'Internal error' });
};