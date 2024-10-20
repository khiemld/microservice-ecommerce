import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from "../model/dto";
import { Brand } from "../model/model";

export interface IBrandUseCase {
  create(data: BrandCreateDTO): Promise<string>;
  get(id: string): Promise<Brand | null>;
  list(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>>;
  update(id: string, data: BrandUpdateDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface IBrandRepository
  extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> {}

export interface ICreateCommand {
  dto: BrandCreateDTO;
}

export interface IUpdateCommand {
  id: string;
  dto: BrandUpdateDTO;
}

export interface IDeleteCommand {
  id: string;
}

export interface IListBrands {
  cond: BrandCondDTO;
  paging: PagingDTO;
}

export interface IGetDetail {
  id: string;
}
