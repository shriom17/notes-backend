import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
//routes
app.use('/api/auth', require('./modules/auth/auth.router').authRouter);
app.use('/api/notes', require('./modules/notes/notes.router').notesRouter);

export default app;