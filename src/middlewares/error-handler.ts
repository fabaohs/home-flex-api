import { type NextFunction, type Request, type Response } from "express";
import { BaseError, InternalServerError } from "../configs/error.ts";
import { ErrorEnum } from "../shared/enums/error-responses.enum.ts";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isHandled = err instanceof BaseError;
  const error = isHandled
    ? err
    : new InternalServerError(
        ErrorEnum.INTERNAL_SERVER_ERROR,
        "An unexpected error ocurred"
      );

  const { statusCode, errorCode, message, stack } = error;

  return res.status(statusCode).json({
    success: false,
    timestamp: new Date(),
    message: message,
    errorCode: errorCode,
    statusCode: statusCode,
    ...{
      ...(process.env.NODE_ENV !== "production" && statusCode === 500
        ? { stack: stack }
        : null),
    },
  });
}
