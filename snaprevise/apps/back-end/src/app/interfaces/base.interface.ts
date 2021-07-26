import { Model, Repository } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize';
import { NextFunction, Request, Response } from 'express';

export interface IBaseRepository<T extends Model> {
  readonly insert: (model: T) => Promise<T>;
  readonly update: (model: T, id: string | number) => Promise<[number, T[]]>;
  readonly remove: (id: string | number) => Promise<number>;
  readonly findAll: (expression: WhereOptions, models: Array<Repository<Model>>) => Promise<T[]>;
  readonly findOne: (expression: WhereOptions, models: Array<Repository<Model>>) => Promise<T>;
  readonly getRepository: () => Repository<T>;
}

export interface IBaseService<T extends Model> {
  insert(model: T): Promise<T>;

  update(model: T, id: string | number): Promise<[number, T[]]>;

  remove(id: string | number): Promise<number>;

  findAll(expression: WhereOptions, models: Array<Repository<Model>>): Promise<T[]>;

  findOne(expression: WhereOptions, models: Array<Repository<Model>>): Promise<T>;
}

export interface IBaseController<T extends Model> {
  insert(req: Request, res: Response, next: NextFunction): Promise<Response>;

  update(req: Request, res: Response, next: NextFunction): Promise<Response>;

  remove(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
