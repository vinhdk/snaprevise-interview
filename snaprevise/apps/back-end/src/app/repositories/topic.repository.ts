import { BaseRepository } from './base.repository';
import { Topic } from '../models';
import { Sequelize } from 'sequelize-typescript';
import { ITopicRepository } from '../interfaces';

export class TopicRepository extends BaseRepository<Topic> implements ITopicRepository {
  constructor(sequelize: Sequelize) {
    super(Topic, sequelize);
  }
}
