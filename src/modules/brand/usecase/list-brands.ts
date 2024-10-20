import { IQueryHandler } from "../../../share/interface";
import { IBrandRepository, IListBrands } from "../interface";
import { Brand } from "../model/model";

export class ListBrandsUseCase implements IQueryHandler<IListBrands, Brand[]> {
  constructor(private readonly repository: IBrandRepository) {}

  async query(query: IListBrands): Promise<Brand[]> {
    const { cond, paging } = query;
    const data = await this.repository.list(cond, paging);
    return data;
  }
}
