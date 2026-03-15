import bcrypt from 'bcrypt';
import { prisma } from '../../config/database';
import { tokenLib } from '../../lib/token';
import { AppError } from '../../middleware/errorHandler';
import type { LoginInput, RegisterInput } from './auth.validation';

export const authService = {

  async register(input: RegisterInput) {
    // email already আছে কিনা check
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new AppError('Email already in use', 409, 'DUPLICATE_EMAIL');
    }

    // password hash করো
    const passwordHash = await bcrypt.hash(input.password, 12);

    // user save করো
    const user = await prisma.user.create({
      data: {
        full_name: input.full_name,
        email: input.email,
        password_hash: passwordHash,
      },
      select: { id: true, full_name: true, email: true },
    });

    return user;
  },

  async login(input: LoginInput) {
    // user খোঁজো
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    // timing attack এড়াতে dummy hash দিয়ে compare
    const dummyHash = '$2b$12$invalidhashinvalidhashinvalidhashx';
    const passwordToCheck = user?.password_hash ?? dummyHash;
    const isValid = await bcrypt.compare(input.password, passwordToCheck);

    if (!user || !isValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    // JWT generate করো
    const token = tokenLib.generateToken(user.id, user.email);

    return { token, user: { id: user.id, full_name: user.full_name, email: user.email } };
  },

};