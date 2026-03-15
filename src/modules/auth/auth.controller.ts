import type { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendCreated, sendSuccess } from '../../utils/response';
import { COOKIE_OPTIONS } from '../../config/jwt';

export const authController = {
    async register(req: Request, res: Response) {
        const user = await authService.register(req.body);
        return sendCreated(res, { user });
    },

    async login(req: Request, res: Response) {
        const { token, user } = await authService.login(req.body);
        res.cookie('access_token', token, COOKIE_OPTIONS);
        return sendSuccess(res, { user });
    },

    async logout(_req: Request, res: Response) {
        res.clearCookie('access_token');
        return sendSuccess(res, { message: 'Logged out successfully' });
    },
};