import LivroRepository from "../repositories/livro.repository.js";
import VendaRepository from "../repositories/venda.repository.js";
import LivroInfoRepository from "../repositories/livroInfo.repository.js";

async function createLivro(livro) {
  return await LivroRepository.insertLivro(livro);
}

async function getLivro(id) {
  const livro = await LivroRepository.getLivro(id);
  livro.livroInfo = await LivroInfoRepository.getLivroInfo(parseInt(id));
  return livro;
}

async function getLivros(autorId) {
  if (autorId) {
    return await LivroRepository.getLivrosByAutor(autorId);
  }
  return await LivroRepository.getLivros();
}

async function updateLivro(livro) {
  return await LivroRepository.updateLivro(livro);
}

async function deleteLivro(id) {
  const venda = await VendaRepository.getVendasByLivro(id);
  if (venda.length === 0) {
    return await LivroRepository.deleteLivro(id);
  }
  throw new Error("Existem vendas para este Livro!");
}

async function getLivrosInfo() {
  return await LivroInfoRepository.getLivrosInfo();
}

async function createLivroInfo(livro) {
  await LivroInfoRepository.createLivroInfo(livro);
}

async function updateLivroInfo(livro) {
  await LivroInfoRepository.updateLivroInfo(livro);
}

async function deleteLivroInfo(id) {
  await LivroInfoRepository.deleteLivroInfo(id);
}

async function createAvaliacao(avaliacao, livroId) {
  await LivroInfoRepository.createAvaliacao(avaliacao, livroId);
}

async function deleteAvaliacao(id, index) {
  await LivroInfoRepository.deleteAvaliacao(id, index);
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
  createAvaliacao,
  deleteAvaliacao,
};
