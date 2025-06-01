const jwt = require('jsonwebtoken');
const path = require('path');
const SECRET_KEY = 'JWT_SECRET123'; // Reemplaza con process.env.SECRET_KEY idealmente

// Verifica si el token es válido
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    // Si es una petición desde navegador, redirige al login
    if (req.accepts('html')) {
      return res.redirect('/views/login.html');
    } else {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      if (req.accepts('html')) {
        return res.redirect('/views/login.html');
      } else {
        return res.status(403).json({ message: 'Token inválido' });
      }
    }

    req.user = user;
    next();
  });
}

// Verifica si el usuario tiene el rol requerido
function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      if (req.accepts('html')) {
        return res.redirect('/views/login.html');
      } else {
        return res.status(403).json({ message: 'Acceso denegado' });
      }
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
};
