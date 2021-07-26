import * as express from 'express';
import { ModuleRoute, PaperRoute, QuestionRoute, TopicRoute } from './routes';
import { RepositoryInjection, ServiceInjection } from './injections';

export class AppRoutes {
  public static readonly ROUTE = '/api/v1/';

  public static apply(
    app: express.Application,
    repository: RepositoryInjection,
    service: ServiceInjection
  ): void {
    const paper = new PaperRoute(app, repository.getPaper(), service.getPaper(), repository.getModule().getRepository());
    const module = new ModuleRoute(app, repository.getModule(), service.getModule(), repository.getTopic().getRepository());
    const topic = new TopicRoute(app, repository.getTopic(), service.getTopic(), repository.getQuestion().getRepository());
    const question = new QuestionRoute(app, repository.getQuestion(), service.getQuestion());
  }
}
