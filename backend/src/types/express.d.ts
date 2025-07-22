import "express";

declare global {
  namespace Express {
    interface UserPayload {
      name: string;
      email: string;
      picture?: string;
    }

    interface Request {
      user: UserPayload;
    }
  }
}
