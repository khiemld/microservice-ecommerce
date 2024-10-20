import { v7 } from "uuid";
import { ICommandHandler } from "../../../share/interface";
import { ICommandRepository } from "../../categories/interface";
import { IBrandRepository, ICreateCommand } from "../interface";
import { BrandCreateDTO, BrandCreateDTOSchema } from "../model/dto";
import { Brand } from "../model/model";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrInvalidData } from "../../../share/model/base-error";

export class CreateNewBrandUseCase
  implements ICommandHandler<ICreateCommand, string>
{
  constructor(private repo: IBrandRepository) {}

  async execute(command: ICreateCommand): Promise<string> {
    const { success, data: parsedData } = BrandCreateDTOSchema.safeParse(
      command.dto
    );

    if (!success) {
      throw ErrInvalidData;
    }

    const newId = v7();

    const brand: Brand = {
      ...parsedData,
      id: newId,
      status: ModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repo.insert(brand);

    return newId;
  }
}
