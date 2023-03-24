import { getClient } from "./mongo.db.js";

async function createLivroInfo(livroInfo) {
  const client = getClient();
  try {
    await client.connect();
    await client
      .db("livraria-api")
      .collection("livroInfo")
      .insertOne(livroInfo);
  } catch (e) {
    throw e;
  } finally {
    await client.close();
  }
}

async function updateLivroInfo(livroInfo) {
  const client = getClient();
  try {
    await client.connect();
    await client
      .db("livraria-api")
      .collection("livroInfo")
      .updateOne({ livroId: livroInfo.livroId }, { $set: { ...livroInfo } });
  } catch (e) {
    throw e;
  } finally {
    await client.close();
  }
}

async function deleteLivroInfo(livroId) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("livraria-api")
      .collection("livroInfo")
      .deleteOne({ livroId });
  } catch (e) {
    throw e;
  } finally {
    await client.close();
  }
}

async function getLivrosInfo() {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("livraria-api")
      .collection("livroInfo")
      .find({})
      .toArray();
  } catch (e) {
    throw e;
  } finally {
    await client.close();
  }
}

async function getLivroInfo(livroId) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("livraria-api")
      .collection("livroInfo")
      .findOne({ livroId });
  } catch (e) {
    throw e;
  } finally {
    await client.close();
  }
}

async function createAvaliacao(avaliacao, livroId) {
  try {
    const livroInfo = await getLivroInfo(parseInt(livroId));
    livroInfo.avaliacoes.push(avaliacao);
    await updateLivroInfo(livroInfo);
  } catch (e) {
    throw e;
  }
}

async function deleteAvaliacao(livroId, index) {
  try {
    const livroInfo = await getLivroInfo(parseInt(livroId));
    livroInfo.avaliacoes.splice(index, 1);
    await updateLivroInfo(livroInfo);
  } catch (e) {
    throw e;
  }
}

export default {
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  getLivrosInfo,
  getLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
};
