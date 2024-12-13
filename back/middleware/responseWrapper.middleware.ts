import { NextFunction, Request, Response } from "express";
import ICustomResponses from "../interfaces/ICustomResponses.interface";
import { User } from "../models/user/user.model";
import { generateTokenFromUser } from "./jwt.middleware";

export interface LoggedRequest extends Request {
  user?: User;
}

const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res);

  res.json = (data: any) => {
    let newData: ICustomResponses = {
      success: true,
      payload: data,
    };

    if (data instanceof Error) {
      newData.success = true;
      newData.error = {
        message: data.message,
        stack: data.stack,
        name: data.name,
      };
    }

	const user = (req as LoggedRequest).user;
    if (user) {
      newData.token = {
        token: generateTokenFromUser(user),
        expiresTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
		role: user.get().role,
      };
    }

    return originalJson(newData);
  };

  next();
};

export default responseWrapper;
