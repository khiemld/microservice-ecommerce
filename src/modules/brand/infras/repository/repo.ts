import { Sequelize } from "sequelize";
import { BaseRepoSequelize } from "../../../../share/repository/repo-sequelize";
import { BrandCondDTO, BrandUpdateDTO } from "../../model/dto";
import { Brand } from "../../model/model";
import { modelName } from "./dto";

export class MySQLBrandRepository extends BaseRepoSequelize<
  Brand,
  BrandCondDTO,
  BrandUpdateDTO
> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
