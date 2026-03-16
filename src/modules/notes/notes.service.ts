import { prisma } from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import type { CreateNoteInput, UpdateNoteInput } from './notes.validation';

export const notesService = {

  async getAllNotes(userId: string) {
    const notes = await prisma.note.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
      },
      orderBy: { created_at: 'desc' },
    });
    return notes;
  },

  async getNoteById(noteId: string, userId: string) {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        user_id: userId,
        deleted_at: null,
      },
    });

    if (!note) {
      throw new AppError('Note not found', 404, 'NOT_FOUND');
    }

    return note;
  },

  async createNote(userId: string, input: CreateNoteInput) {
    const note = await prisma.note.create({
      data: {
        title: input.title,
        content: input.content,
        user_id: userId,
      },
    });
    return note;
  },

  async updateNote(noteId: string, userId: string, input: UpdateNoteInput) {
    // আগে check করো note টা এই user এর কিনা
    await notesService.getNoteById(noteId, userId);

    const updated = await prisma.note.update({
      where: { id: noteId },
      data: {
        ...(input.title   && { title: input.title }),
        ...(input.content && { content: input.content }),
      },
    });

    return updated;
  },

  async deleteNote(noteId: string, userId: string) {
    // আগে check করো note টা এই user এর কিনা
    await notesService.getNoteById(noteId, userId);

    // soft delete — DB থেকে মুছবে না, deleted_at set হবে
    await prisma.note.update({
      where: { id: noteId },
      data: { deleted_at: new Date() },
    });
  },

};