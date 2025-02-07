import express from 'express';
import {getNote,getNotes,addNote,removeNote} from './src/dataBase/dataBase.js'
const app = express();
const port = process.env.PORT || 3000;


app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}) );
app.get("/", (req, res) => {
    res.render("index.ejs",{
        numberOfIteration:20
    })
})


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
app.get("/notes", (req, res) => {
    const searchTerm = req.query.searchTerm;
    const notes = getNotes(searchTerm);
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
app.use(express.static("public"))

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
})