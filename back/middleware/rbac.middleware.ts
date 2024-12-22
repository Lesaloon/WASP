import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user/user.model';
import { LoggedRequest } from './responseWrapper.middleware';

// Middleware to check user roles
// export const checkRole = (requiredRole: 'user' | 'admin' | 'writer') => {
//   return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

//     const user = await User.findByPk((req as LoggedRequest).user?.get().id);
//     if (!user) {
//       res.status(403).json({ message: 'Access denied. Must be logged in with a valid user' });
//       return;
//     }
//     const role = user.get().role;
//     // if the user has the required role or is an admin, continue
//     if (role.includes(requiredRole) || role.includes('admin')) {
//       (req as any).user = user;
//       next();  // Call the next middleware if the user has the required role
//     } else {
//       res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
//     }
//   };
// };

/**
 * Middleware to check user roles
 * @param requiredRole The list of allowed roles for the route
 */
export const checkRole = (requiredRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('checkRole', requiredRole);
    console.log('user', (req as LoggedRequest).user);
    const user = await User.findByPk((req as LoggedRequest).user?.id);
    if (!user) {
      res.status(403).json({ message: 'Access denied. Must be logged in with a valid user' });
      return;
    }
    const role = user.get().role;
    // if the user has the required role or is an admin, continue
    if (requiredRole.some((r) => role.includes(r)) || role.includes('admin')) {
      (req as any).user = user;
      next();  // Call the next middleware if the user has the required role
    } else {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.', expectedRole: requiredRole, userRole: role });
    }
  };
};
