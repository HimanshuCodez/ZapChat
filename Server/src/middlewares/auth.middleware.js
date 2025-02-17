import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

// Middleware to authenticate JWT
export const protectRoute = async (req, res, next) => {
try {
    const token = req.cookies.jwtToken
if(!token ){
    return res.status(401).json({ message: 'Not authorized, token is required' })
}
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({ message: 'Not authorized, token is invalid' })
    }
  const user  = await User.findById(decoded.userId).select('-password')
  if(!user){
    return res.status(401).json({ message: 'User not found' })
  }
  req.user = user
  next()
} catch (error) {
    console.log("error in middleware route", error);
    res.status(500).json({ message: 'middleware error' })
    
}
   
}