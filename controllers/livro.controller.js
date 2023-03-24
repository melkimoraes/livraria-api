import LivroService from "../services/livro.service.js";

async function createLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autorId) {
      throw new Error("Nome, Valor, Estoque e Autor são obrigatórios.");
    }
    livro = await LivroService.createLivro(livro);
    res.send(livro);
    logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function getLivro(req, res, next) {
  try {
    res.send(await LivroService.getLivro(req.params.id));
    logger.info("GET /livro/id");
  } catch (err) {
    next(err);
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autorId));
  } catch (err) {
    next(err);
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body;
    if (
      !livro.livroId ||
      !livro.valor ||
      livro.estoque ||
      livro.autorId ||
      livro.nome
    ) {
      throw new Error("Apenas o Valor do livro pode ser obrigatórios.");
    }
    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    logger.info(`PUT /livro - ${JSON.stringify(livro_id)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteLivro(req, res, next) {
  try {
    await LivroService.deleteLivro(req.params.id);
    res.end();
    logger.info(`DELETE /livro/id`);
  } catch (err) {
    next(err);
  }
}

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error("Livro ID é obrigatorio");
    }
    await LivroService.createLivroInfo(livroInfo);
    res.end();
    logger.info(`POST /livro/info - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function getLivrosInfo(req, res, next) {
  try {
    res.send(await LivroService.getLivrosInfo());
    logger.info("GET /livro/info");
  } catch (err) {
    next(err);
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error("Livro ID é obrigatorio");
    }
    await LivroService.updateLivroInfo(livroInfo);
    res.end();
    logger.info(`PUT /livro/info - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    await LivroService.deleteLivroInfo(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /livro/info`);
  } catch (err) {
    next(err);
  }
}

async function createLivroAvaliacao(req, res, next) {
  try {
    let params = req.body;
    if (!params.avaliacao) {
      throw new Error("Avaliacao sao obrigatórios");
    }
    console.log(params.avaliacao);
    await LivroService.createAvaliacao(params.avaliacao, req.params.id);
    res.end();
    logger.info(`CREATE AVALIACAO /livro/info/avaliacao`);
  } catch (err) {
    next(err);
  }
}

async function deleteLivroAvaliacao(req, res, next) {
  try {
    if (!req.params.id || !req.params.index) {
      throw new Error("Livro ID e Index sao obrigatórios");
    }
    await LivroService.deleteAvaliacao(req.params.id, req.params.index);
    res.end();
    logger.info(`CREATE AVALIACAO /livro/info/avaliacao`);
  } catch (err) {
    next(err);
  }
}

export default {
  createLivro,
  getLivro,
  getLivros,
  updateLivro,
  deleteLivro,
  getLivrosInfo,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  createLivroAvaliacao,
  deleteLivroAvaliacao,
};
