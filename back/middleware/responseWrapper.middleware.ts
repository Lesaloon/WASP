import { NextFunction, Request, Response } from "express";
import ICustomResponses from "../interfaces/ICustomResponses.interface";

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

    // if ((req as LoggedRequest).user) {
    //   newData.token = generateTokenFromRequest(req as LoggedRequest);
    // }

    return originalJson(newData);
  };

  next();
};

export default responseWrapper;
