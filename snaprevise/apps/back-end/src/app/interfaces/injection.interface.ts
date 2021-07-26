import { ModuleRepository, PaperRepository, QuestionRepository, TopicRepository } from '../repositories';
import { ModuleService, PaperService, QuestionService, TopicService } from '../services';

export interface IRepositoryInjection {
  getModule(): ModuleRepository;
  getPaper(): PaperRepository;
  getTopic(): TopicRepository;
  getQuestion(): QuestionRepository;
}

export interface IServiceInjection {
  getModule(): ModuleService;
  getPaper(): PaperService;
  getTopic(): TopicService;
  getQuestion(): QuestionService;
}
