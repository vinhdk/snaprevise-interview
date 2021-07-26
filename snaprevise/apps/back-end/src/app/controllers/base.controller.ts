import { Model } from 'sequelize-typescript';
import { IBaseController } from '../interfaces';
import { BaseService } from '../services';
import { BaseRepository } from '../repositories';
import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../constants';
import { uuid } from 'uuidv4';

export class BaseController<M extends Model, R extends BaseRepository<M>, S extends BaseService<M, R>> implements IBaseController<M> {

  constructor(
    protected readonly service: S
  ) {
  }

  public async insert(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      req.body.id = uuid();
      const item = await this.service.insert(req.body);
      return res.status(STATUS.CREATED).json(item);
    } catch (err) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: err.message
      });
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      await this.service.remove(req.params.id);
      return res.status(STATUS.DELETED);
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
        const items = await this.service.findAll({}, []);
        for (let item of items) {
          if (item['position'] >= pos && item.id !== req.body.id) {
            item['position'] = item['position'] + 1;
            await this.service.update(item, item.id);
          }
        }
        items.splice(pos, 0, req.body);
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
