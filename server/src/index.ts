import app from "./server";
import { connectToDatabase, closeConnection } from "./db";

connectToDatabase()
  .then(() => {
    const server = app.listen(app.get("port"), () => {
      console.log("Server listening at port:", app.get("port"));
    });

    process.on("SIGINT", async () => {
      try {
        await closeConnection();
        server.close();
        console.log("Database connection closed and server stopped");
      } catch (error) {
        console.error("Error closing the database connection:", error);
        process.exit(1);
      }
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
