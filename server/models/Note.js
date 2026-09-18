import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        content: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;