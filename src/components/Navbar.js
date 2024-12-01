import React from 'react'
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleOnclick=()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }
  let location = useLocation();

  useEffect(() => {
    console.log(" i am looking for this",location.pathname)
  }, [location]);
  

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="nav justify-content-start">
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname === '/')?"active":"" }`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname === '/about')?"active":"" }`} aria-current="page" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname === '/hello')?"active":"" }`} aria-current="page" to="/hello">Hello</Link>
        </li>
        // this demo below syntxt says that if user is not loged in then show login and signup buttons 
        {!localStorage.getItem('token') ? <form zz >
        <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1 " to="/signup" role="button">Signup</Link>
        </form>: <button onClick={handleOnclick} className='btn btn-primary' >Logout</button> }
        
        
      </ul>
      
    </div>
  </div>
</nav>
    
    </>
  )
}

export default Navbar
