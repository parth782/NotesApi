const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');
var fetchuser = require('../middlewares/fetchuser')
router.get('/getallnotes', fetchuser, async (req, res) => {
     const notes = await Notes.find({ user: req.user.id })
     res.json(notes)
})
router.post('/addnote', body('title', 'Enter a Valid Title').isLength({ min: 5 }), body('description', 'Enter at least 5 characters in description').isLength({ min: 10 }), fetchuser, async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          const notes = new Notes({
               title, description, tag, user: req.user.id
          })
          const savenote = await notes.save();
          res.status(200).json(savenote)
     } catch (errors) {
          res.status(404).json(errors.message)
     }

})
router.put('/updatenote/:id', fetchuser, async (req, res) => {
     try {
          const { title, description, tag } = req.body;
          const newnote = {};
          if (title) { newnote.title = title }
          if (description) { newnote.description = description }
          if (description) { newnote.tag = tag }

          //Find the note to be updated
          let note = await Notes.findById(req.params.id)
          if (!note) { res.status(404).send("Not Found") }
          if (note.user.toString() != req.user.id) {
               res.status(401).send("Login to edit notes")
          }
          note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
          res.json({
               "status":1,
               "note":note
               
          });


     } catch (errors) {
          res.status(404).json(errors.message)
     }

})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     try {
          let note = await Notes.findById(req.params.id)
         
          if (note==null) { res.status(404).send("Not Found") }
          if (note.user.toString() != req.user.id) {
               res.status(401).send("Login to edit notes")
          }
          note = await Notes.findByIdAndDelete(req.params.id)
          res.status(200).send({"message":"Note deleted successfully","status":"success","note":note});
     } catch (errors) {
          res.status(404).json(errors.message)
     }
})
module.exports = router