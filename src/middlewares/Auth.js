const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.url == '/users' && req.method == 'POST' || req.url == '/users/auth' && req.method == 'POST') {
    return next();
  }

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }
  const parts = authHeader.split(' ');

  if (!parts.lenght === 2) {
    return res.status(401).send({ error: 'Token error' });
  }

  const [token] = parts;

  jwt.verify(token, 'chatappsecret', (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });
    req.user = decoded.id;
    return next();
});
}