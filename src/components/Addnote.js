import { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({title:"", description:"", tages:""})

    const onClickhandle=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tages);
        // setNote({title:"", description:"", tages:""})
        props.showAlert("Your Note Has Successfully Added",'success');


    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
        
    }
    

    return (
        <div>
            <div className="container my-3">
                <h1> Add a note in Demo </h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"    
                            id="title"
                            aria-describedby="emailHelp"
                            name="title"
                            onChange={onChange}
                            value={note.title}
                        />
                         <label htmlFor="exampleInputEmail1" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            aria-describedby="emailHelp"
                            name="description"
                            onChange={onChange}
                            value={note.description}
                        />
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Tages
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tages"
                            aria-describedby="emailHelp"
                            name="tages"
                            onChange={onChange}
                            value={note.tages}
                        />
                       
                    </div>
                    
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={onClickhandle}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addnote;
