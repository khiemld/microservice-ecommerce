import { Sequelize } from "sequelize";
import { init } from "./infras/repository/dto";
import { MySQLBrandRepository } from "./infras/repository/repo";
import { CreateNewBrandUseCase } from "./usecase/create-brand";
import { BrandHttpService } from "./infras/transport/http-service";
import { Router } from "express";
import { GetDetailUseCase } from "./usecase/get-detail-brand";
import { UpdateBrandUseCase } from "./usecase/update-brand";
import { DeleteBrandUseCase } from "./usecase/delete-brand";
import { ListBrandsUseCase } from "./usecase/list-brands";

export const setupBrandHexagonal = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new MySQLBrandRepository(sequelize);
  const createBrandUseCase = new CreateNewBrandUseCase(repository);
  const getDetailBrandUseCase = new GetDetailUseCase(repository);
  const updateBrandUseCase = new UpdateBrandUseCase(repository);
  const deleteBrandUseCase = new DeleteBrandUseCase(repository);
  const listBrandsUseCase = new ListBrandsUseCase(repository);
  const httpService = new BrandHttpService(
    createBrandUseCase,
    getDetailBrandUseCase,
    updateBrandUseCase,
    deleteBrandUseCase,
    listBrandsUseCase
  );

  const router = Router();

  router.post("/brands", httpService.createBrand.bind(httpService));
  router.get("/brands/:id", httpService.getDetailBrand.bind(httpService));
  router.patch("/brands/:id", httpService.updateBrand.bind(httpService));
  router.delete("/brands/:id", httpService.deleteBrand.bind(httpService));
  router.get("/brands", httpService.listBrands.bind(httpService));

  return router;
};
