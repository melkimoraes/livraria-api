import mongodb from "mongodb";
import "dotenv/config";

function getClient() {
  const uri = process.env.MONGOURL;
  return new mongodb.MongoClient(uri);
}

export { getClient };
