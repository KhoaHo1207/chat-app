import app from "#app.js";
import { Env } from "#config/env.config.js";

const PORT = Env.PORT || 5000;

app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
