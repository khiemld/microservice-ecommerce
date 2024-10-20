import { IQueryHandler } from "../../../share/interface";
import { ErrDataNotFound } from "../../../share/model/base-error";
import { ModelStatus } from "../../../share/model/base-model";
import { IBrandRepository, IGetDetail } from "../interface";
import { Brand } from "../model/model";

export class GetDetailUseCase implements IQueryHandler<IGetDetail, Brand> {
  constructor(private readonly repository: IBrandRepository) {}

  async query(query: IGetDetail): Promise<Brand> {
    const data = await this.repository.get(query.id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }
}
