import ClienteRepository from "../repositories/cliente.repository.js";
import VendaRepository from "../repositories/venda.repository.js";
import basicAuth from "express-basic-auth";

async function createCliente(cliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function getCliente(id) {
  return await ClienteRepository.getCliente(id);
}

async function getClientes() {
  return await ClienteRepository.getClientes();
}

async function updateCliente(cliente) {
  return await ClienteRepository.updateCliente(cliente);
}

async function deleteCliente(id) {
  const venda = await VendaRepository.getVendasByCliente(id);
  if (venda.length === 0) {
    return await ClienteRepository.deleteCliente(id);
  } else {
    const cliente = await ClienteRepository.getCliente(id);
    throw new Error(`Já existe venda para o cliente.`);
  }
}

async function verificaLogin(email, senha) {
  const cliente = await ClienteRepository.getClienteByEmail(email);
  if (!cliente) {
    return false;
  }
  return basicAuth.safeCompare(cliente.senha, senha);
}

async function getClienteByEmail(email) {
  return await ClienteRepository.getClienteByEmail(email);
}

export default {
  createCliente,
  getCliente,
  getClientes,
  updateCliente,
  deleteCliente,
  verificaLogin,
  getClienteByEmail,
};
