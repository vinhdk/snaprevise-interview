import * as express from 'express';
import { TopicRepository } from '../repositories';
import { TopicService } from '../services';
import { TopicController } from '../controllers';
import { Repository } from 'sequelize-typescript';
import { Question } from '../models';

export class TopicRoute {

  public static readonly ROUTE =  '/api/v1/Topic';

  protected readonly controller: TopicController;

  constructor(
    protected readonly app: express.Application,
    protected readonly repository: TopicRepository,
    protected readonly service: TopicService,
    protected readonly questionRepository: Repository<Question>
  ) {
    this.controller = new TopicController(service, questionRepository);
    this.init();
  }

  protected init(): void {
    this.applyMain();
    this.applyById();
  }

  protected applyMain(): void {
    this.app.route(TopicRoute.ROUTE)
      .get((req, res, next) => {
        return this.controller.findAll(req, res, next);
      })
      .put((req, res, next) => {
        return this.controller.update(req, res, next);
      })
      .post((req, res, next) => {
        return this.controller.insert(req, res, next);
      });
  }

  protected applyById(): void {
    this.app.route(TopicRoute.ROUTE + '/:id')
      .get((req, res, next) => {
        return this.controller.findById(req, res, next);
      })
      .delete((req, res, next) => {
        return this.controller.remove(req, res, next);
      });
  }

}
