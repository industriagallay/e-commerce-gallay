import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

let client: MongoClient | undefined;

export async function connectToDatabase() {
  try {
    if (!uri) {
      throw new Error("DB_URI environment variable is not defined");
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    throw error;
  }
}

export function getClient() {
  if (!client) {
    throw new Error("Database client is not connected");
  }

  return client;
}

export async function closeConnection() {
  if (client) {
    await client.close();
    console.log("Disconnected from the MongoDB database");
  }
}
