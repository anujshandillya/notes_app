import express from 'express';
import mongoose from 'mongoose';
import Note from '../models/Note.js';
const router = express.Router();
router.param('id', (req, res, next, id) => {
    if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ message: 'Invalid note ID.' });
    next();
});
function validateNote(req, res, next) {
    const { title, content } = req.body ?? {};
    if (typeof title !== 'string' || !title.trim() || title.trim().length > 100 ||
        typeof content !== 'string' || !content.trim()) {
        return res.status(400).json({ message: 'Add a title (up to 100 characters) and note content.' });
    }
    req.note = { title: title.trim(), content: content.trim() };
    next();
}
router.get('/notes', async (req, res) => res.json(await Note.find().sort({ createdAt: -1 })));
router.post('/notes', validateNote, async (req, res) => res.status(201).json(await Note.create(req.note)));

router.delete('/notes/:id', async (req, res) => {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found.' });
    res.status(204).end();
});
export default router;
