const jwt = require('jsonwebtoken');

const jwtSignToken = (id: string, expirationTime: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token expires in 24 hours
  );
};

export { jwtSignToken };
