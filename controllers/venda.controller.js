import VendaService from "../services/venda.service.js";
import ClienteService from "../services/cliente.service.js";

async function createVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.data || !venda.livroId) {
      throw new Error("Data e Livro são obrigatórios.");
    }
    if (venda.valor) {
      throw new Error("Nao deve informar o valor!");
    }
    if (req.auth.user !== "admin") {
      const cliente = await ClienteService.getClienteByEmail(req.auth.user);
      venda.clienteId = cliente.clienteId;
    } else {
      if (!venda.clienteId) {
        throw new Error("USUARIO ADMIN PREENCHE O CLIENTEID!");
      }
    }
    venda = await VendaService.createVenda(venda);
    res.send(venda);
    logger.info(`POST /venda - ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

async function getVenda(req, res, next) {
  try {
    const venda = await VendaService.getVenda(req.params.id);
    if (req.auth.user !== "admin") {
      const cliente = await ClienteService.getClienteByEmail(req.auth.user);
      if (venda.clienteId !== cliente.clienteId) {
        throw new Error("Voce só pode consultar suas compras!");
      }
    }
    res.send(venda);
    logger.info("GET /venda/id");
  } catch (err) {
    next(err);
  }
}

async function getVendas(req, res, next) {
  try {
    res.send(
      await VendaService.getVendas(
        req.query.clienteId,
        req.query.livroId,
        req.query.autorId
      )
    );
  } catch (err) {
    next(err);
  }
}

async function updateVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.valor || !venda.data || !venda.clienteId || !venda.livroId) {
      throw new Error("Valor, Data, Cliente e Livro são obrigatórios.");
    }
    venda = await VendaService.updateVenda(venda);
    res.send(venda);
    logger.info(`PUT /venda - ${JSON.stringify(venda_id)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteVenda(req, res, next) {
  try {
    await VendaService.deleteVenda(req.params.id);
    res.end();
    logger.info(`DELETE /venda/id`);
  } catch (err) {
    next(err);
  }
}

export default {
  createVenda,
  getVenda,
  getVendas,
  updateVenda,
  deleteVenda,
};
