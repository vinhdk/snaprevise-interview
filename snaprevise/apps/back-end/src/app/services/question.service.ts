import { BaseService } from './base.service';
import { QuestionRepository } from '../repositories';
import { Question } from '../models';
import { IQuestionService } from '../interfaces';

export class QuestionService extends BaseService<Question, QuestionRepository> implements IQuestionService {
  constructor(
    protected readonly repository: QuestionRepository
  ) {
    super(repository);
  }
}
