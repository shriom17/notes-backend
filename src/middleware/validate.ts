import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';

type Schema = ZodTypeAny;

export function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };
}
