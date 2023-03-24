import VendaRepository from "../repositories/venda.repository.js";
import ClienteRepository from "../repositories/cliente.repository.js";
import LivroRepository from "../repositories/livro.repository.js";

async function createVenda(venda) {
  if (!(await ClienteRepository.getCliente(venda.clienteId))) {
    throw new Error("ClienteId Nao existe!");
  }
  const livro = await LivroRepository.getLivro(venda.livroId);
  if (!livro) {
    throw new Error("LivroId Nao existe!");
  }

  venda.valor = livro.valor;

  if (livro.estoque > 0) {
    venda = await VendaRepository.insertVenda(venda);
    livro.estoque--;
    await LivroRepository.updateLivro(livro);
    return venda;
  } else {
    throw new Error("O produto informado nao possui estoque.");
  }
}

async function getVenda(id) {
  return await VendaRepository.getVenda(id);
}

async function getVendas(clienteId, livroId, autorId) {
  if (clienteId) {
    return await VendaRepository.getVendasByCliente(clienteId);
  } else if (livroId) {
    return await VendaRepository.getVendasByLivro(livroId);
  } else if (autorId) {
    return await VendaRepository.getVendasByAutor(autorId);
  } else {
    return await VendaRepository.getVendas();
  }
}

async function updateVenda(venda) {
  return await VendaRepository.updateVenda(venda);
}

async function deleteVenda(id) {
  return await VendaRepository.deleteVenda(id);
}

export default {
  createVenda,
  getVenda,
  getVendas,
  updateVenda,
  deleteVenda,
};
