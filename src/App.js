import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from "./context/Notes/NoteState.js";
import "./index.css"
import Alert from "./components/Alert.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import { useState } from "react";
import RefrshHandler from "./components/RefrshHandler.js";
import { Navigate } from "react-router-dom";
import Hello from "./components/Hello.js";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  const [alert, setAlert] = useState(null);
  const showAlert= (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
        setAlert(null);
    },1500);

  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>  
        <Alert alert={alert}/>
        <div className="container">
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

        
        
        <Routes>
        <Route path='/about' element={<PrivateRoute element={ <About/>}/>} />
          <Route path="/" element={<PrivateRoute element={<Home showAlert={showAlert}/>}/>}/>
          <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
          <Route path="/hello" element={<PrivateRoute element={<Hello/>}/>}/>

          

        </Routes>
        </div>
        </Router>

     
        </NoteState>
     
    </>
  );
}

export default App;
