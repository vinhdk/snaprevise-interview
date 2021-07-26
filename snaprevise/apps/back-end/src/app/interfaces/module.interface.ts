import { IBaseController, IBaseRepository, IBaseService } from './base.interface';
import { Module } from '../models';
import { NextFunction, Request, Response } from 'express';

export interface IModuleRepository extends IBaseRepository<Module> {
}

export interface IModuleService extends IBaseService<Module> {
}

export interface IModuleController extends IBaseController<Module> {
  findAll(req: Request, res: Response, next: NextFunction): Promise<Response>;

  findById(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
