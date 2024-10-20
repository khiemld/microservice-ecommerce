import { ICommandHandler } from "../../../share/interface";
import { ErrDataNotFound } from "../../../share/model/base-error";
import { ModelStatus } from "../../../share/model/base-model";
import { IBrandRepository, IDeleteCommand } from "../interface";

export class DeleteBrandUseCase
  implements ICommandHandler<IDeleteCommand, boolean>
{
  constructor(private readonly repository: IBrandRepository) {}
  async execute(cmd: IDeleteCommand): Promise<boolean> {
    const { id } = cmd;
    const brand = await this.repository.get(id);
    if (!brand || brand.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }
    const isHard = false;
    await this.repository.delete(id, isHard);
    return true;
  }
}
