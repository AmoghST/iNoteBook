import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
    const [signupcredential, setsignupcredential]= useState({name:'', email:'', password:'', cpassword:''});
    const navigate = useNavigate();
      const handleonsubmit=async(e)=>{
        e.preventDefault();
        if(signupcredential.password === signupcredential.cpassword){

        
        const response =await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name: signupcredential.name, email: signupcredential.email, password: signupcredential.password})
        })
        const json =await response.json();
        console.log(json);
        if(json.success){
          // localStorage.setItem('token', json.authtoken)
          navigate('/login')
          props.showAlert("Account Created Successfully", "success");
        }else{
          props.showAlert("Invalid credential", "danger");
        }
      }else{
        props.showAlert("Password and Confirm Password doesn't match", "danger");
        
      }
    }

   
   
   function onChange(e){
    setsignupcredential({...signupcredential, [e.target.name] : e.target.value})

   }
  return (
    <div className='container p-3 mt-3'>
      <h2 className='mb-4 mt-2'>Create An Account to Use iNoteBook</h2>
<form onSubmit={handleonsubmit}>
<div className="mb-3">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="name" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"   minLength={3}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1">Email </label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange}   minLength={5}required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange}   minLength={5} required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
      
  )
}

export default Singup
