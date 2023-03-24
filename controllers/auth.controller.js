import basicAuth from "express-basic-auth";
import ClienteService from "../services/cliente.service.js";

function getRole(username) {
  if (username === "admin") {
    return "admin";
  }
  return "cliente";
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    console.log(req.auth.user);
    if (req.auth.user) {
      const role = getRole(req.auth.user);
      if (isAllowed(role)) {
        next();
      } else {
        res.status(403).send("Usuario sem permissao");
      }
    } else {
      res.status(403).send("Usuario nao encontrado");
    }
  };
}

function authorizer(username, password, cb) {
  if (
    basicAuth.safeCompare(username, "admin") &&
    basicAuth.safeCompare(password, "1234")
  ) {
    return cb(null, true);
  }
  ClienteService.verificaLogin(username, password)
    .then((value) => {
      return cb(null, value);
    })
    .catch(() => {
      return cb(null, false);
    });
}

export { getRole, authorizer, authorize };
