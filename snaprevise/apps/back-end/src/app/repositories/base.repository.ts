import { Model, Repository, Sequelize } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize';
import { IBaseRepository } from '../interfaces';

export abstract class BaseRepository<T extends Model> implements IBaseRepository<T> {

  protected readonly repository: Repository<T>;

  protected constructor(
    protected readonly model: new () => T,
    protected readonly sequelize: Sequelize
  ) {
    this.repository = sequelize.getRepository(model);
  }

  public readonly insert = (model: T): Promise<T> => {
    return this.repository.create(model);
  };
  public readonly update = (model: T, id: string | number): Promise<[number, T[]]> => {
    return this.repository.update(model, { where: { id: id } });
  };
  public readonly remove = (id: string | number): Promise<number> => {
    return this.repository.destroy({ where: { id: id } });
  };
  public readonly findOne = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T> => {
    return this.repository.findOne({ where: expression, include: models });
  };
  public readonly findAll = (expression: WhereOptions, models: Array<Repository<Model>>): Promise<T[]> => {
    return this.repository.findAll({ include: models, where: expression });
  };

  public readonly getRepository = (): Repository<T> => {
    return this.sequelize.getRepository(this.model);
  };
}
