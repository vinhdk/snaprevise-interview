import { BaseRepository } from './base.repository';
import { Question } from '../models';
import { Sequelize } from 'sequelize-typescript';
import { IQuestionRepository } from '../interfaces';

export class QuestionRepository extends BaseRepository<Question> implements IQuestionRepository {
  constructor(sequelize: Sequelize) {
    super(Question, sequelize);
  }
}
