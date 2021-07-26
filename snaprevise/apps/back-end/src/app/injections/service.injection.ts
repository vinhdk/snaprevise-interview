import { ModuleService, PaperService, QuestionService, TopicService } from '../services';
import { IServiceInjection } from '../interfaces';
import { RepositoryInjection } from './repository.injection';

export class ServiceInjection implements IServiceInjection{
  protected readonly paper: PaperService;
  protected readonly module: ModuleService;
  protected readonly question: QuestionService;
  protected readonly topic: TopicService;

  constructor(
    protected readonly repository: RepositoryInjection
  ) {
    this.paper = new PaperService(repository.getPaper());
    this.module = new ModuleService(repository.getModule());
    this.question = new QuestionService(repository.getQuestion());
    this.topic = new TopicService(repository.getTopic());
  }

  public getModule(): ModuleService {
    return this.module;
  }

  public getPaper(): PaperService {
    return this.paper;
  }

  public getQuestion(): QuestionService {
    return this.question;
  }

  public getTopic(): TopicService {
    return this.topic;
  }
}
