import { BaseRepository } from './base.repository';
import { Paper } from '../models';
import { Sequelize } from 'sequelize-typescript';
import { IPaperRepository } from '../interfaces';

export class PaperRepository extends BaseRepository<Paper> implements IPaperRepository {
  constructor(sequelize: Sequelize) {
    super(Paper, sequelize);
  }
}
