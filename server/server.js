import express from 'express';
import cors from 'cors';
import ConnectToDB from './config/db.js';
import router from './routes/NoteRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api', (req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
try {
    await ConnectToDB();
    const port = process.env.PORT || 6001;
    app.listen(port, () => console.log(`Server started on port ${port}`));
} catch (error) {
    console.error('Server startup failed:', error.message);
    process.exitCode = 1;
}
