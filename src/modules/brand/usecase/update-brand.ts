import { ICommandHandler } from "../../../share/interface";
import {
  ErrDataNotFound,
  ErrInvalidData,
} from "../../../share/model/base-error";
import { IBrandRepository, IUpdateCommand } from "../interface";
import { BrandUpdateDTOSchema } from "../model/dto";

export class UpdateBrandUseCase
  implements ICommandHandler<IUpdateCommand, boolean>
{
  constructor(private readonly repository: IBrandRepository) {}

  async execute(command: IUpdateCommand): Promise<boolean> {
    const { success, data: parsedData } = BrandUpdateDTOSchema.safeParse(
      command.dto
    );
    if (!success) {
      throw ErrInvalidData;
    }
    const id = command.id;
    const brand = await this.repository.get(id);
    if (!brand) {
      throw ErrDataNotFound;
    }
    const updatedBrand = {
      ...brand,
      ...parsedData,
    };
    await this.repository.update(id, updatedBrand);
    return true;
  }
}
