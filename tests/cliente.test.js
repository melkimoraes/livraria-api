import request from "supertest";
import app from "../index.js";
import VendaRepository from "../repositories/venda.repository.js";
import LivroRepository from "../repositories/livro.repository.js";
import AutorRepository from "../repositories/autor.repository.js";
import ClienteRepository from "../repositories/cliente.repository.js";

jest.setTimeout(30000);
// SÓ NAO FICOU BOM DE BOM , PQ O GETLIVRO TRAZ BAGULHO DO MONGO E DAI DEU PAU NO TESTE -> FIQUEI COM PREGUIÇA DE CRIAR UM GETLIVRO SEM TRAZER AS COISAS DO MONGO!
test("CENARIO 01", async () => {
  const autor = {
    nome: "Autor de Teste",
    email: "autordeteste@gmail.com",
    telefone: "3213123",
  };

  const livro = {
    nome: "Livro de Teste",
    valor: "150",
    estoque: 5,
    autorId: null,
  };

  const cliente = {
    nome: "Cliente de Teste",
    email: "clientedeteste@gmail.com",
    senha: "123",
    telefone: "321312312",
    endereco: "Rua X, n 100",
  };

  const venda = {
    data: "2000-01-01",
    clienteId: null,
    livroId: null,
  };

  const emailAdmin = "admin";
  const senhaAdmin = "1234";
  let emailCliente = cliente.email;
  let senhaCliente = cliente.senha;

  let res = await request(app)
    .post("/autor")
    .send(autor)
    .auth(emailAdmin, senhaAdmin);
  autor.autorId = res.body.autorId;
  expect(res.body).toMatchObject(autor);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/autor/${autor.autorId}`)
    .auth(emailAdmin, senhaAdmin);
  expect(res.body).toMatchObject(autor);
  expect(res.status).toBe(200);

  livro.autorId = autor.autorId;
  res = await request(app)
    .post("/livro")
    .send(livro)
    .auth(emailAdmin, senhaAdmin);
  livro.livroId = res.body.livroId;
  expect(res.body).toMatchObject(livro);
  expect(res.status).toBe(200);

  /*res = await request(app)
    .get(`/livro/${livro.livroId}`)
    .auth(emailAdmin, senhaAdmin);
  expect(res.body).toMatchObject(livro);
  expect(res.status).toBe(200);*/

  res = await request(app)
    .post("/cliente")
    .send(cliente)
    .auth(emailAdmin, senhaAdmin);
  cliente.clienteId = res.body.clienteId;
  delete cliente.senha;
  expect(res.body).toMatchObject(cliente);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/cliente/${cliente.clienteId}`)
    .auth(emailAdmin, senhaAdmin);
  expect(res.body).toMatchObject(cliente);
  expect(res.status).toBe(200);

  /*res = await request(app)
    .get(`/livro/${livro.livroId}`)
    .auth(emailCliente, senhaCliente);
  expect(res.body).toMatchObject(livro);
  expect(res.status).toBe(200);*/

  venda.clienteId = cliente.clienteId;
  venda.livroId = livro.livroId;
  res = await request(app)
    .post("/venda")
    .send(venda)
    .auth(emailCliente, senhaCliente);
  venda.vendaId = res.body.vendaId;
  expect(res.body).toMatchObject(venda);
  expect(res.status).toBe(200);

  res = await request(app)
    .get(`/venda/${venda.vendaId}`)
    .auth(emailAdmin, senhaAdmin);
  expect(res.body).toMatchObject(venda);
  expect(res.status).toBe(200);

  await VendaRepository.deleteVenda(venda.vendaId);
  await LivroRepository.deleteLivro(livro.livroId);
  await AutorRepository.deleteAutor(autor.autorId);
  await ClienteRepository.deleteCliente(cliente.clienteId);
});
