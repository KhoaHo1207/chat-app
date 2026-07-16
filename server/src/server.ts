import app from "#app.js";
import { connectDatabase } from "#config/database.config.js";
import { Env } from "#config/env.config.js";

const PORT = Env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
