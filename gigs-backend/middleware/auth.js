const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);
  console.log("AUTH HEADER:", authHeader);
  console.log("Request Body:", req.body);

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; 

    console.log("Decoded token payload:", user);
    console.log("Authenticated User ID:", user.id);


    next();
  });
}
// This middleware checks if the user has one of the specified roles
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
