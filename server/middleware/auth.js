import jwt from 'jsonwebtoken';

// next allows us to have the function "continue"
export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({msg: "No authentication token, authorization denied"});
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({error: err.message});
  }
}