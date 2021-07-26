import { BaseService } from './base.service';
import { TopicRepository } from '../repositories';
import { Topic } from '../models';
import { ITopicService } from '../interfaces';

export class TopicService extends BaseService<Topic, TopicRepository> implements ITopicService {
  constructor(
    protected readonly repository: TopicRepository
  ) {
    super(repository);
  }
}
