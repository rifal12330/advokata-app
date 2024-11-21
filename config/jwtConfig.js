const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET, // Secret key dari .env
        { expiresIn: '1h' }
    );
};

module.exports = generateToken;
