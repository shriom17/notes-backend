import type { Response } from 'express';

export function sendSuccess(res: Response, data: unknown, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data });
}

export function sendCreated(res: Response, data: unknown) {
  return res.status(201).json({ success: true, data });
}
