import express  from 'express';
import {controller} from '../dataBase/dataBaseControl.js'

export const router = express.Router();





router.get("/notes", controller.getNotes)
router.get("/note/:id", controller.getNote)
router.get("/createNote", controller.createNote)
router.post("/notes", controller.addNote)
router.post("/notes/:id/delete",controller.removeNote)



/*

app.get("/note/:id", (req, res) => {
    const index = parseInt(req.params.id);
    const note =getNote(index);
    if(!note){
        res.status(404).render('note404.ejs');
        return;
    }
    res.render("note.ejs",{
        note,
    })
})
app.get("/notes", async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const notes =  await getNotes(searchTerm);
    console.log(notes);
    res.render("notes.ejs",{
        notes,
    })
})

app.get("/createNote",(req, res) => {
    res.render("createNote.ejs")
})
app.post("/notes",(req, res) => {
    const note = req.body
    addNote(note)
    res.redirect("/notes")
})
app.post("/notes/:id/delete",(req, res) => {
    const index = parseInt(req.params.id)
    removeNote(index)
    res.redirect("/notes")
})
    */

