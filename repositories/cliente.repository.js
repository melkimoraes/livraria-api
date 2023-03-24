import Cliente from "../models/cliente.model.js";

async function insertCliente(cliente) {
  try {
    return await Cliente.create(cliente);
  } catch (err) {
    throw err;
  }
}

async function getClientes() {
  try {
    return await Cliente.findAll({
      attributes: ["clienteId", "nome", "email", "telefone", "endereco"],
    });
  } catch (err) {
    throw err;
  }
}

async function getCliente(id) {
  try {
    return await Cliente.findByPk(id, {
      attributes: ["clienteId", "nome", "email", "telefone", "endereco"],
    });
  } catch (err) {
    throw err;
  }
}

async function updateCliente(cliente) {
  try {
    await Cliente.update(cliente, {
      where: {
        clienteId: cliente.clienteId,
      },
    });
    return await getCliente(cliente.clienteId);
  } catch (err) {
    throw err;
  }
}

async function deleteCliente(id) {
  try {
    await Cliente.destroy({
      where: {
        clienteId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getClienteByEmail(email) {
  try {
    return await Cliente.findOne({
      where: {
        email,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
  getClienteByEmail,
};
