import Venda from "../models/venda.model.js";
import Cliente from "../models/cliente.model.js";
import Livro from "../models/livro.model.js";

async function insertVenda(venda) {
  try {
    return await Venda.create(venda);
  } catch (err) {
    throw err;
  }
}

async function getVendas() {
  try {
    return await Venda.findAll();
  } catch (err) {
    throw err;
  }
}

async function getVenda(id) {
  try {
    return await Venda.findByPk(id, {
      include: [
        {
          model: Cliente,
        },
        {
          model: Livro,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function updateVenda(venda) {
  try {
    await Venda.update(venda, {
      where: {
        vendaId: venda.vendaId,
      },
    });
    return await getVenda(venda.vendaId);
  } catch (err) {
    throw err;
  }
}

async function deleteVenda(id) {
  try {
    await Venda.destroy({
      where: {
        vendaId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByCliente(clienteId) {
  try {
    return await Venda.findAll({
      where: {
        clienteId: clienteId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByLivro(livroId) {
  try {
    return await Venda.findAll({
      where: {
        livroId: livroId,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByAutor(autorId) {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
          where: {
            autorId: autorId,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertVenda,
  getVendas,
  getVenda,
  updateVenda,
  deleteVenda,
  getVendasByCliente,
  getVendasByLivro,
  getVendasByAutor,
};
