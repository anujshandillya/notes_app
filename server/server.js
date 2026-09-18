import express from "express";
import cors from "cors";
import ConnectToDB from "./config/db.js";
import router from "./routes/NoteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = 6001;

try {
    const dbStatus = await ConnectToDB();
    if(dbStatus == 500) {
        throw new Error("Server did not start");
    }

    app.listen(PORT, () => {
        console.log("Server started at PORT 6001...");
    })
} catch (error) {
    console.error(error);
}