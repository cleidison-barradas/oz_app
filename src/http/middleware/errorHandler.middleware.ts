import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";
import { HTTP_STATUS_CODE } from "../../utils/constants";
import { IAppError } from "../../interfaces/app.error.interface";

export function errorHandlerMiddleware(
  err: IAppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = err.statusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
  const message = err.message || "An unexpected error occurred";

  if (process.env.NODE_ENV === "development") {
    logger.error(`[ERROR] ${status} - ${message}`);
  }

  res.status(status).json({ error: message });
}
