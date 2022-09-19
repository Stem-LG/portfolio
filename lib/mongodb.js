import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);

export default client;
