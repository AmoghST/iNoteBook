import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";



const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote}= context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tages}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note Has Deleted Successfully",'danger');
}}></i>
          <i className="fa-solid fa-user-pen mx-2" onClick={()=>{updateNote(note)}}></i>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
