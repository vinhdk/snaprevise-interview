import { IBaseController, IBaseRepository, IBaseService } from './base.interface';
import { Paper } from '../models';
import { NextFunction, Request, Response } from 'express';

export interface IPaperRepository extends IBaseRepository<Paper> {
}

export interface IPaperService extends IBaseService<Paper> {
}

export interface IPaperController extends IBaseController<Paper> {
  findAll(req: Request, res: Response, next: NextFunction): Promise<Response>;

  findById(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
