import type { Request, Response } from 'express';
import { notesService } from './notes.service';
import { sendSuccess, sendCreated } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';
import { AppError } from '../../middleware/errorHandler';

export const notesController = {

  getUserId(req: Request) {
    const userId = (req as AuthenticatedRequest).user?.id;
    if (!userId) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }
    return userId;
  },

  getNoteId(req: Request) {
    const noteId = req.params.id;
    if (!noteId || Array.isArray(noteId)) {
      throw new AppError('Invalid note id', 400, 'INVALID_NOTE_ID');
    }
    return noteId;
  },

  async getAll(req: Request, res: Response) {
    const userId = notesController.getUserId(req);
    const notes = await notesService.getAllNotes(userId);
    return sendSuccess(res, { notes });
  },

  async getOne(req: Request, res: Response) {
    const userId = notesController.getUserId(req);
    const noteId = notesController.getNoteId(req);
    const note = await notesService.getNoteById(noteId, userId);
    return sendSuccess(res, { note });
  },

  async create(req: Request, res: Response) {
    const userId = notesController.getUserId(req);
    const note = await notesService.createNote(userId, req.body);
    return sendCreated(res, { note });
  },

  async update(req: Request, res: Response) {
    const userId = notesController.getUserId(req);
    const noteId = notesController.getNoteId(req);
    const note = await notesService.updateNote(noteId, userId, req.body);
    return sendSuccess(res, { note });
  },

  async delete(req: Request, res: Response) {
    const userId = notesController.getUserId(req);
    const noteId = notesController.getNoteId(req);
    await notesService.deleteNote(noteId, userId);
    return sendSuccess(res, { message: 'Note deleted' });
  },

};
