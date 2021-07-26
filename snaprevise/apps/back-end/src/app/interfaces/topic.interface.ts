import { IBaseController, IBaseRepository, IBaseService } from './base.interface';
import { Topic } from '../models';
import { NextFunction, Request, Response } from 'express';

export interface ITopicRepository extends IBaseRepository<Topic> {
}

export interface ITopicService extends IBaseService<Topic> {
}

export interface ITopicController extends IBaseController<Topic> {
  findAll(req: Request, res: Response, next: NextFunction): Promise<Response>;

  findById(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
