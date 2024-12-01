const jwt = require('jsonwebtoken')
const JWT_secret ='amoghisgoodb$oyyyy'

const fetchuser=(req, res, next)=>{
    //get the user from jwt token and add into request object 

    const token = req.header('auth-token');
    if(!token){
         res.status(401).json({"error":"please authenticate using valid user "});
    }

    try{
        const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next()
    }
    catch(error){
        res.status(401).json({"error":"please authenticate using valid user "});
    }
}
    
module.exports = fetchuser;