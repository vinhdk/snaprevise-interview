import { BaseController } from './base.controller';
import { Module, Paper } from '../models';
import { PaperRepository } from '../repositories';
import { PaperService } from '../services';
import { IPaperController } from '../interfaces';
import { Repository } from 'sequelize-typescript';
import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../constants';

export class PaperController extends BaseController<Paper, PaperRepository, PaperService> implements IPaperController {
  constructor(
    protected readonly service: PaperService,
    protected readonly moduleRepository: Repository<Module>
  ) {
    super(service);
  }

  public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const rs = await this.service.findAll({}, []);
      return res.status(STATUS.OK).json(rs.sort((a,b) => a['position'] - b['position']));
    } catch (err) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: err.message
      });
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const rs = await this.service.findOne({
        id: req.params.id
      }, [this.moduleRepository]);
      rs.modules = rs.modules.sort((a,b) => a['position'] - b['position']);
      return res.status(STATUS.OK).json(rs);
    } catch (err) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: err.message
      });
    }
  }

}
