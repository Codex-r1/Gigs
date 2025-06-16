const jwt = require('jsonwebtoken');

// Simulated user object
const user = {
  id: 9,
  role: 'employer',  // You can change this to 'applicant' or 'admin'
};

// Secret key used in your backend
const secretKey = 'secretkey'; // Match this to the one in your middleware

// Sign the token
const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

console.log('Generated Token:\n');
console.log(token);
