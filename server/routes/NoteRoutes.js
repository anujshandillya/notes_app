import express from "express"

const router = express.Router();

const dummyFunc = async (req, res) => {
    return res.status(200).json({
        hehe: "avanish bhai the GOAT..."
    })
}

router.get("/notes", dummyFunc);
router.post("/notes", dummyFunc);
router.delete("/notes/:id", dummyFunc);

export default router;