import ClienteService from "../services/cliente.service.js";

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        "Nome, E-mail, Senha, Telefone e Endereço são obrigatórios."
      );
    }
    cliente = await ClienteService.createCliente(cliente);
    res.send(cliente);
    logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    res.send(await ClienteService.getCliente(req.params.id));
    logger.info("GET /cliente/id");
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.clienteId ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        "Cliente ID, Name, CPF, Phone, Email e Addres são obrigatórios."
      );
    }
    if (req.auth.user !== "admin" && req.auth.user !== cliente.email) {
      throw new Error("Voce só pode alterar o seu proprio perfil");
    }
    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    await ClienteService.deleteCliente(req.params.id);
    res.end();
    logger.info(`DELETE /cliente/id`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCliente,
  getCliente,
  getClientes,
  updateCliente,
  deleteCliente,
};
