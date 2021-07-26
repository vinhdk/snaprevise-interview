import { BaseController } from './base.controller';
import { Module, Topic } from '../models';
import { ModuleRepository } from '../repositories';
import { ModuleService } from '../services';
import { IModuleController } from '../interfaces';
import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../constants';
import { Repository } from 'sequelize-typescript';

export class ModuleController extends BaseController<Module, ModuleRepository, ModuleService> implements IModuleController {
  constructor(
    protected readonly service: ModuleService,
    protected readonly topicRepository: Repository<Topic>
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
      }, [this.topicRepository]);
      rs.topics = rs.topics.sort((a,b) => a['position'] - b['position']);
      return res.status(STATUS.OK).json(rs);
    } catch (err) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: err.message
      });
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await this.service.update(req.body, req.body.id);
      if (req.body.updateAll) {
        const pos = req.body.position;
        const items = await this.service.findAll({
          paperId: req.body.paperId
        }, []);
        for (let item of items) {
          if (item['position'] >= pos && item.id !== req.body.id) {
            item['position'] = item['position'] + 1;
            await this.service.update(item, item.id);
          }
        }
        return res.status(STATUS.UPDATED).json(items.sort((a,b) => a['position'] - b['position']));
      } else {
        return res.status(STATUS.UPDATED).json(req.body);
      }
    } catch (err) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: err.message
      });
    }
  }

}
