import * as express from 'express';
import { PaperRepository } from '../repositories';
import { PaperService } from '../services';
import { PaperController } from '../controllers';
import { Module } from '../models';
import { Repository } from 'sequelize-typescript';

export class PaperRoute {

  public static readonly ROUTE = '/api/v1/Paper';

  protected readonly controller: PaperController;

  constructor(
    protected readonly app: express.Application,
    protected readonly repository: PaperRepository,
    protected readonly service: PaperService,
    protected readonly moduleRepository: Repository<Module>,
  ) {
    this.controller = new PaperController(service, moduleRepository);
    this.init();
  }

  protected init(): void {
    this.applyMain();
    this.applyById();
  }

  protected applyMain(): void {
    this.app.route(PaperRoute.ROUTE)
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
    this.app.route(PaperRoute.ROUTE + '/:id')
      .get((req, res, next) => {
        return this.controller.findById(req, res, next);
      })
      .delete((req, res, next) => {
        return this.controller.remove(req, res, next);
      });
  }
}
