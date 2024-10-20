import { Request, Response } from "express";
import { ICommandHandler, IQueryHandler } from "../../../../share/interface";
import {
  ICreateCommand,
  IDeleteCommand,
  IGetDetail,
  IListBrands,
  IUpdateCommand,
} from "../../interface";
import { Brand } from "../../model/model";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { ErrInvalidData } from "../../../../share/model/base-error";

export class BrandHttpService {
  constructor(
    private readonly createBrandCmdHandler: ICommandHandler<
      ICreateCommand,
      string
    >,
    private readonly getDetailBrandQryHandler: IQueryHandler<IGetDetail, Brand>,
    private readonly updateBrandCmdHandler: ICommandHandler<
      IUpdateCommand,
      boolean
    >,
    private readonly deleteBrandCmdHandler: ICommandHandler<
      IDeleteCommand,
      boolean
    >,
    private readonly listBrandsQryHandler: IQueryHandler<IListBrands, Brand[]>
  ) {}

  async createBrand(req: Request, res: Response) {
    try {
      const cmd: ICreateCommand = {
        dto: req.body,
      };
      const result = await this.createBrandCmdHandler.execute(cmd);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
  async getDetailBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const query: IGetDetail = {
        id,
      };

      const result = await this.getDetailBrandQryHandler.query(query);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
  async updateBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cmd: IUpdateCommand = {
        id: id,
        dto: req.body,
      };
      const result = await this.updateBrandCmdHandler.execute(cmd);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
  async deleteBrand(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.deleteBrandCmdHandler.execute({ id });
      res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
  async listBrands(req: Request, res: Response) {
    try {
      const { success, data: paging } = PagingDTOSchema.safeParse(req.query);
      if (!success) {
        throw ErrInvalidData;
      }
      const query: IListBrands = {
        cond: {},
        paging,
      };
      const result = await this.listBrandsQryHandler.query(query);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message,
      });
    }
  }
}
