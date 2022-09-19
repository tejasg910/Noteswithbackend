const jwt  = require('jsonwebtoken');
const JWT_SECRET = "Tejasgiriisagoodguy"

const fetchuser =  (req, res, next)=>{
    const token  = req.header('auth-token');
    if(!token){
        res.status(401).json({error: "access denied token not found "})
        console.log('token is not found')
    }

    try {
        console.log('in the try block')
        const showToken  = jwt.verify(token, JWT_SECRET);
        console.log(showToken)
        req.user = showToken.user;
        // console.log( "The req.bhai is "+ req.user.id)
        next();
        
    } catch (error) {
        res.status(401).json({error: "access denied"})
        console.log(error.message)
        
    }


}

module.exports = fetchuser;