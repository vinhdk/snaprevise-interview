import * as express from 'express';
import { ModuleRepository } from '../repositories';
import { ModuleService } from '../services';
import { ModuleController } from '../controllers';
import { Repository } from 'sequelize-typescript';
import { Topic } from '../models';
import { AppRoutes } from '../app.routing';

export class ModuleRoute {

  public static readonly ROUTE = '/api/v1/Module';

  protected readonly controller: ModuleController;

  constructor(
    protected readonly app: express.Application,
    protected readonly repository: ModuleRepository,
    protected readonly service: ModuleService,
    protected readonly topicRepository: Repository<Topic>
  ) {
    this.controller = new ModuleController(service, topicRepository);
    this.init();
  }

  protected init(): void {
    this.applyMain();
    this.applyById();
  }

  protected applyMain(): void {
    this.app.route(ModuleRoute.ROUTE)
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
    this.app.route(ModuleRoute.ROUTE + '/:id')
      .get((req, res, next) => {
        return this.controller.findById(req, res, next);
      })
      .delete((req, res, next) => {
        return this.controller.remove(req, res, next);
      });
  }
}
