
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const initialnotes =[]
    const [notes, setNotes]= useState(initialnotes)
    console.log(typeof notes);

    //fetch note
    const getNotes= async ()=>{

      //api call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        }

       });
       const json = await response.json();
       console.log(json)
       setNotes(json.notes);
       
      
    }
    

    //Add note
    const addNote= async (title, description, tages)=>{

      //api call 
      const response = await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tages})

       });
       const note = await response.json();
       setNotes(notes.concat(note));
       

    } 


    //Delete note 
    const deleteNote= async (id)=>{
        //Api call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
  
         });
         const json = await response.json();
         console.log(json);

      console.log("deleting note wiht id " + id)
      const newNote = notes.filter((note)=>{return note._id !== id})
      setNotes(newNote);

    } 


    //Edit note
    const editNote= async(id, title, description, tages)=>{
      //Api call
       const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tages})

       });
       const json = await response.json();


       let newNote = JSON.parse(JSON.stringify(notes))
       // logic to edit in client 
    for(let index= 0; index<notes.length; index++){
      const element = notes[index];
      if(element._id === id){
        newNote[index].title = title;
        newNote[index].description =description;
        newNote[index].tages = tages;
        break;
      }
    }
    setNotes(newNote);

    } 
    

    

    return(
        <noteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes }}>

        {props.children}
        </noteContext.Provider> 


    )


}

export default NoteState;