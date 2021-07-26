import * as express from 'express';
import { QuestionRepository } from '../repositories';
import { QuestionService } from '../services';
import { QuestionController } from '../controllers';

export class QuestionRoute {

  public static readonly ROUTE =  '/api/v1/Question';

  protected readonly controller: QuestionController;

  constructor(
    protected readonly app: express.Application,
    protected readonly repository: QuestionRepository,
    protected readonly service: QuestionService
  ) {
    this.controller = new QuestionController(service);
    this.init();
  }

  protected init(): void {
    this.applyMain();
    this.applyById();
  }

  protected applyMain(): void {
    this.app.route(QuestionRoute.ROUTE)
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
    this.app.route(QuestionRoute.ROUTE + '/:id')
      .get((req, res, next) => {
        return this.controller.findById(req, res, next);
      })
      .delete((req, res, next) => {
        return this.controller.remove(req, res, next);
      });
  }
}
