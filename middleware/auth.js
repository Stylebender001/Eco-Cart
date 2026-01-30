import jwt from 'jwtwebtoken';

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. NO token provided');
  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token', ex);
  }
}
export default auth;
