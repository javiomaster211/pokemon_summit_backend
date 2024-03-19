const jwt = require('jsonwebtoken');

const jwtSignToken = (id: string, expirationTime: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: expirationTime } // Token expires in 24 hours
  );
};

export { jwtSignToken };
