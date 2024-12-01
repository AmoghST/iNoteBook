const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const Note = require('../models/Notes')
const { body , validationResult } = require('express-validator');

const router =  express.Router()


// ROUTE 1: get all the notes using get:'/api/notes/fetchalluser' no login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
  try{

  
  const notes = await Note.find({user: req.user.id});
   
    res.json({notes});
  }catch{
    res.status(500).send("internal server error ")

  }
  })

// ROUTE 2: add a new notes usign POSt request  :'/api/notes/addnotes '  login required
router.post('/addnote',fetchuser,[
  body('title','please enter valid title minimun 3 character required  ').isLength({ min: 3 }),
  body('description','please enter valid description ').isLength({ min: 5 }),

], async (req, res) => {
  try{
  const {title, description, tages} =req.body;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title, description, tages, user: req.user.id
    })
    const saveNotes = await note.save()
    res.json({saveNotes})
  }catch{
    res.status(500).send("internal server error ")
  }
  })

// ROUTE 3: add a new notes usign PUT request  :'/api/notes/updatenote '  login required
router.put('/updatenote/:id', fetchuser, async(req, res) => {
  try{

  
  const {title, description, tages} = req.body;
  // Create a newNote object
  const newNote = {};
  if (title) {newNote.title = title};
  if (description) {newNote.description = description};
  if (tages) {newNote.tages = tages};
  // Find the note to be updated and update it
  let note = await Note.findById (req.params.id);
  console.log(note);
  if(!note) {return res.status(404).send ("Not Found") }
  console.log("i am " + note.user.toString());// this is user id of their note 
  console.log(req.user.id);// this is tha id of the user has sent request 

  if (note.user.toString() !== req.user.id) { return res.status (401).send ("Not Allowed");
  }
  note = await Note.findByIdAndUpdate (req.params.id, {$set: newNote}, {new:true})
  res.json(note);
}catch{
  res.status(500).send("internal server error ")
}


})

// ROUTE 4: delete a existing  notes using delete request   :'/api/notes/deletenote '  login required
router.delete('/deletenote/:id', fetchuser, async(req, res) => {

  try{
    let note = await Note.findById (req.params.id);
  if(!note) {return res.status(404).send ("Not Found") }
  

  if (note.user.toString() !== req.user.id) { return res.status (401).send ("Not Allowed");
  }
  note = await Note.findByIdAndDelete (req.params.id)
  res.json({"success":"notes has been successfully deleted ", note:note});
  }catch{
    res.status(500).send("internal server error ")

  }
  
  // Find the note to be updated and update it
  
})

  module.exports = router