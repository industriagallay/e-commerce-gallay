import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.VITE_DB_URI;

let connection: Connection | undefined;

export async function connectToDatabase() {
  try {
    if (!uri) {
      throw new Error("DB_URI environment variable is not defined");
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "industria-gallay-database",
    };

    await mongoose.connect(uri, options);

    connection = mongoose.connection;

    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    throw error;
  }
}

export function getConnection() {
  if (!connection) {
    throw new Error("Database connection is not established");
  }

  return connection;
}

export async function closeConnection() {
  if (connection) {
    await connection.close();
    console.log("Disconnected from the MongoDB database");
  }
}
