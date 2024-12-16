import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user/user.model';
import { LoggedRequest } from './responseWrapper.middleware';

// Middleware to check user roles
export const checkRole = (requiredRole: 'user' | 'admin') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const user = await User.findByPk((req as LoggedRequest).user?.get().id);
    if (!user) {
      res.status(403).json({ message: 'Access denied. Must be logged in with a valid user' });
      return;
    }
    const userRole = user.get().role;
    if (userRole.includes(requiredRole) || userRole.includes('admin')) {
      (req as any).user = user;
      next();  // Call the next middleware if the user has the required role
    } else {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
  };
};