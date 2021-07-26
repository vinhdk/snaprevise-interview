import { IBaseService } from '../interfaces';
import { Model, Repository } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize/types';
import { BaseRepository } from '../repositories';

export class BaseService<M extends Model, R extends BaseRepository<M>> implements IBaseService<M>{

  constructor(
    protected readonly repository: R,
  ) { }

  public findAll(expression: WhereOptions, models: Array<Repository<Model>>): Promise<M[]> {
    return this.repository.findAll(expression, models);
  }

  public findOne(expression: WhereOptions, models: Array<Repository<Model>>): Promise<M> {
    return this.repository.findOne(expression, models);
  }

  public insert(model: M): Promise<M> {
    return this.repository.insert(model);
  }

  public remove(id: string | number): Promise<number> {
    return this.repository.remove(id);
  }

  public update(model: M, id: string | number): Promise<[number, M[]]> {
    return this.repository.update(model, id);
  }

}
