import { useContext, useEffect, useRef, useState } from "react"
import noteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote  from "./Addnote";
import { useNavigate } from "react-router-dom";
const Notes =  (props) => { 
  let navigate = useNavigate();

    const context = useContext(noteContext)
  const {notes, getNotes, editNote}= context;


  useEffect(()=>{
   
    //this code says that if user dont have token then redirec user to login page
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/login');
    }
  },[])

  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etages:""})

  const updateNote=(currentnote)=>{
    console.log(currentnote);
    ref.current.click();
    setNote({id: currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etages:currentnote.tages})
  }

    const onClickhandle=(e)=>{
      console.log("updated note is ",  note)
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etages);
        refClose.current.click();
        props.showAlert("Your Note Has Successfully Updated",'success');



    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
        
    }
    

  return (
    <>
    <Addnote showAlert={props.showAlert}/>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"    
                            id="etitle"
                            aria-describedby="emailHelp"
                            name="etitle"
                            value={note.etitle}
                            onChange={onChange}
                        />
                         <label htmlFor="exampleInputEmail1" className="form-label">
                            description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="edescription"
                            aria-describedby="emailHelp"
                            name="edescription"
                            value={note.edescription}
                            onChange={onChange}
                        />
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            tages
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="etages"
                            aria-describedby="emailHelp"
                            name="etages"
                            value={note.etages}
                            onChange={onChange}
                        />
                       
                    </div>
                </form>
        
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={onClickhandle} className="btn btn-primary">Update Note</button>
      </div>
    </div>  
  </div>
</div>

    <div className='row my-3'>
        <h1> Your note </h1>
        <div className="container">
        {(!notes || notes.length === 0) && "No Notes To Display"}
        </div>
        
        {Array.isArray(notes) &&
  notes.map((note) => (
    <Noteitem
      updateNote={updateNote}
      showAlert={props.showAlert}
      note={note}
      key={note._id}
    />
  ))}
    </div>
    </>
  )
}

export default Notes
