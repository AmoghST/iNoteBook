import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credencial, setcredential] = useState({email:'', password:'' })
    const navigate = useNavigate();
    const handleonsubmit= async (e)=>{
        e.preventDefault();
        const response =await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email: credencial.email, password: credencial.password})
        });
        const json = await response.json();
        console.log(json);  
        if(json.success){
            //redirect 
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Login Successfully", "success");


        }else{
        props.showAlert("Invalide Credential", "danger");
        }
    }
    const onchange=(e)=>{
        e.preventDefault();
        setcredential({...credencial,[e.target.name]:  e.target.value})
    }
  return (
    <div className='mt-3'>
        <h2 className='mb-4'>Login To Continue iNoteBook</h2>
        <form onSubmit={handleonsubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control"  onChange={onchange} name="password" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
            
    </div>
  )
}

export default Login
