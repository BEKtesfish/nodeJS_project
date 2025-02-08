
import {getNotes,getNote,addNote,removeNote} from "../../model/dataBaseModel.js"
export let  controller ={}



controller.getNotes = async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const notes =  await getNotes(searchTerm);
    console.log(notes);
    res.render("notes.ejs",{
        notes,
    })
}

controller.getNote = async (req,res) => {
    const index = parseInt(req.params.id);
    const note = await getNote(index);
    if(!note){
        res.status(404).render('note404.ejs');
        return;
    }
    res.render("note.ejs",{
        note,
    })
}

controller.addNote = async (req,res) => {
    const note = req.body
    addNote(note)
    res.redirect("/notes")
}
controller.removeNote = async (req,res) => {
    const index = parseInt(req.params.id)
    await removeNote(index)
    res.redirect("/notes")
}
controller.createNote = async (req,res) => {
    res.render("createNote.ejs")
}