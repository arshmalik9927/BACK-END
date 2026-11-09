import express from "express";
import NoteModel from "./model/notes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Home route
app.get("/", (req, res) => {
    res.send("Server is working well :)");
});

// Create Note
app.post("/notes", async (req, res) => {
    try {
        const { title, description } = req.body;

        const newNote = await NoteModel.create({
            title,
            description
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: newNote
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
app.get("/notes", async (req, res) => {
    try {
        const notes = await NoteModel.find()

        res.status(200).json({
            success: true,
            message: "Notes fatch successfully",
            data: notes
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        })

    }
})


app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await NoteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: deletedNote
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


app.patch("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedNote = await NoteModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...(title !== undefined && { title }),
                    ...(description !== undefined && { description })
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get("/notes/:id", async (req,res)=>{
    const { id } = req.params;
       try {
        const notes = await NoteModel.findById(id)

        res.status(200).json({
            success: true,
            message: "Notes fatch successfully",
            data: notes
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        })

    }
})

export default app;