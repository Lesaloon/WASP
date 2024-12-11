import ICustomResponses from "../interfaces/ICustomResponses.interface";
import { Request, Response, NextFunction } from "express";

const responseWrapper = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res);

  res.json = (data: any) => {
    let newData: ICustomResponses = {
      status: "success",
      payload: data,
    };

    if (data instanceof Error) {
      newData.status = "error";
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