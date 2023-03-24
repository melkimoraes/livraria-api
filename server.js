import app from "./index.js";
import db from "./repositories/db.js";
import { getClient } from "./repositories/mongo.db.js";

app.listen(3791, () => {
  console.log("Aplicação rodando na porta 3791!");
});

db.authenticate().then(async () => {
  await console.log("Conectado ao Postgres");
  mongo();
});

async function mongo() {
  const mongo = getClient();
  try {
    await mongo.connect();
    console.log("Conectado ao mongoDB");
  } catch (e) {
    console.log(`Não foi possivel conectar ao mongo ${e.message}`);
  } finally {
    mongo.close();
  }
}
