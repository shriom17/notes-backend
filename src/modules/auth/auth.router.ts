import { Router } from 'express';
import { authController } from './auth.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { loginSchema, registerSchema } from './auth.validation';
import { authRateLimit } from '../../middleware/authRateLimit';
import { validate } from '../../middleware/validate';
import { asyncHandler } from '../../middleware/asyncHandler';

export const authRouter = Router();

authRouter.post(
    '/register',
    authRateLimit,
    validate(registerSchema),
    asyncHandler(authController.register)
);

authRouter.post(
    '/login',
    authRateLimit,
    validate(loginSchema),
    asyncHandler(authController.login)

);

authRouter.post(
    '/logout',
    authMiddleware,
    asyncHandler(authController.logout)
);

