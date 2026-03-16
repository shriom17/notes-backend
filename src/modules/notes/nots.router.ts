import { Router } from 'express';
import { notesController } from './notes.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { asyncHandler } from '../../middleware/asyncHandler';
import { createNoteSchema, updateNoteSchema } from './notes.validation';

export const notesRouter = Router();
notesRouter.use(authMiddleware);
notesRouter.get('/', asyncHandler(notesController.getAll));
notesRouter.get('/:id', asyncHandler(notesController.getOne));
notesRouter.post('/', validate(createNoteSchema), asyncHandler(notesController.create));
notesRouter.put('/:id', validate(updateNoteSchema), asyncHandler(notesController.update));
notesRouter.delete('/:id', asyncHandler(notesController.delete));
