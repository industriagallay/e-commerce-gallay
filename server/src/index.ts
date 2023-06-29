import app from "./server";
import { connectToDatabase, closeConnection } from "./db";

connectToDatabase()
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log("Server listening at port:", app.get("port"));
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

process.on("SIGINT", () => {
  closeConnection()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error closing the database connection:", error);
      process.exit(1);
    });
});
