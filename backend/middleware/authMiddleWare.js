import  jwt  from "jsonwebtoken";


const isAuthorized = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
    if(!token){
       return res.status(401).json({success: false, message: "please login first access this resource Other users"});
    }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.id = decodedToken._id;

    next()
    } catch (error) { 
        res.status(400).json({ status_code: 400, message: error.message });
    }
}


export default isAuthorized;