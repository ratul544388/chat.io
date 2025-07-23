import "express";

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      name: string;
      email: string;
      image?: string | null
    }

    interface Request {
      user: UserPayload;
    }
  }
}
