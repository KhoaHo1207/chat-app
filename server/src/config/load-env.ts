import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const serverRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

// Prefer server/.env; fall back to server/src/.env
dotenv.config({ path: path.join(serverRoot, ".env") });
dotenv.config({ path: path.join(serverRoot, "src", ".env") });
