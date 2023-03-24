import AutorRepository from "../repositories/autor.repository.js";
import LivroRepository from "../repositories/livro.repository.js";

async function createAutor(autor) {
  return await AutorRepository.insertAutor(autor);
}

async function getAutor(id) {
  return await AutorRepository.getAutor(id);
}

async function getAutores() {
  return await AutorRepository.getAutores();
}

async function updateAutor(autor) {
  return await AutorRepository.updateAutor(autor);
}

async function deleteAutor(id) {
  const autor = await LivroRepository.getLivrosByAutor(id);
  if (autor.length === 0) {
    return await AutorRepository.deleteAutor(id);
  } else {
    throw new Error("Ja existem livros cadastrados com esse Autor!");
  }
}

export default {
  createAutor,
  getAutor,
  getAutores,
  updateAutor,
  deleteAutor,
};
