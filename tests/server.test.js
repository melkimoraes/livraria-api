const supertest = require("supertest");

const request = supertest("http://localhost:3791");

test("Servidor na porta 3791", async () => {
  const resposta = await request.get("/").auth("admin", "1234");
  expect(resposta.status).toBe(200);
});
