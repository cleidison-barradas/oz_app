import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

export const yupHandlerMiddleware =
  <T>(schema: Yup.ObjectSchema<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: error.errors,
        },
      });
    }
  };
