import express, { Request, Response } from "express";
import { sequelize } from "./share/components/sequelize";
import { setupCategoryHexagon } from "./modules/categories";
import { setupBrandHexagonal } from "./modules/brand";
const app = express();

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.use("/v1", setupCategoryHexagon(sequelize));
  app.use("/v1", setupBrandHexagonal(sequelize));

  app.listen(port, () => {
    console.log("Server is running on port 3000");
  });
})();
