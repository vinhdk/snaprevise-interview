import { BaseController } from './base.controller';
import { Question } from '../models';
import { QuestionRepository } from '../repositories';
import { QuestionService } from '../services';
import { IQuestionController } from '../interfaces';
import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../constants';

export class QuestionController extends BaseController<Question, QuestionRepository, QuestionService> implements IQuestionController {
  constructor(
    protected readonly service: QuestionService
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
      }, []);
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
          topicId: req.body.topicId
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
