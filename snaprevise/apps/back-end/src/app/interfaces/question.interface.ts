import { IBaseController, IBaseRepository, IBaseService } from './base.interface';
import { Question } from '../models';
import { NextFunction, Request, Response } from 'express';

export interface IQuestionRepository extends IBaseRepository<Question> {
}

export interface IQuestionService extends IBaseService<Question> {
}

export interface IQuestionController extends IBaseController<Question> {
  findAll(req: Request, res: Response, next: NextFunction): Promise<Response>;

  findById(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
