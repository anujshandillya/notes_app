import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "undefined",
            min: 5,
            max: 100
        },
        content: {
            type: String,
            required: true,
            min: 5,
        }
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;