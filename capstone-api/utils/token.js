const jwt = require("jsonwebtoken");
const secretKey = "fried_chicken";

const generateToken = (data) => jwt.sign(data, secretKey, { algorithm: "HS256", expiresIn: 10000 });

const createUserJwt = (user) => {
    console.log("the user ", user);
  const payload = {
    id: user.id, // Make sure user.id is defined
    email: user.email
  };
  return generateToken(payload);
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return {};
  } 
};

// Commented out testTokens function since it's not used here
// const testTokens = () => {
//   const user = { email: "personal@gmail.com" };
//   const token = generateToken(user);
//   const validatedToken = validateToken(token);  
// };

module.exports = {
  generateToken,
  validateToken,
  createUserJwt
};
