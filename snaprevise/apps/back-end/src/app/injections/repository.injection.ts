import { ModuleRepository, QuestionRepository, TopicRepository, PaperRepository } from '../repositories';
import { IRepositoryInjection } from '../interfaces';
import { Sequelize } from 'sequelize-typescript';

export class RepositoryInjection implements IRepositoryInjection{
  protected readonly paper: PaperRepository;
  protected readonly module: ModuleRepository;
  protected readonly question: QuestionRepository;
  protected readonly topic: TopicRepository;

  constructor(
    protected readonly sequelize: Sequelize
  ) {
    this.paper = new PaperRepository(sequelize);
    this.module = new ModuleRepository(sequelize);
    this.question = new QuestionRepository(sequelize);
    this.topic = new TopicRepository(sequelize);
  }

  public getModule(): ModuleRepository {
    return this.module;
  }

  public getPaper(): PaperRepository {
    return this.paper;
  }

  public getQuestion(): QuestionRepository {
    return this.question;
  }

  public getTopic(): TopicRepository {
    return this.topic;
  }
}
