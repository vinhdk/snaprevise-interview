import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import { AppRoutes } from './app.routing';
import { RepositoryInjection, ServiceInjection } from './injections';
import { readFileSync } from 'fs';
import { environment } from '../environments/environment';
import { Request, Response } from 'express';
import { serve, setup } from "swagger-ui-express";
import { ModuleSwagger, PaperSwagger, QuestionSwagger, TopicSwagger } from './swaggers';
import * as cors from 'cors';

export class AppModule {
  protected readonly app: express.Application;

  constructor(
    protected readonly repository: RepositoryInjection,
    protected readonly service: ServiceInjection,
  ) {
    this.app = express();
    this.applySettings();
    this.applyMiddlewares();
    this.applyRoutes();
    this.createSwagger();
  }

  public listen = async (): Promise<void> => {
    await this.app.listen(this.app.get('port'));
  };

  protected applySettings(): void {
    this.app.use(urlencoded({ limit: '50mb', extended: false }));
    this.app.use(json({ limit: '50mb' }));
    this.app.set('port', process.env.PORT || 8888);
    // this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    //   res.setHeader('Access-Control-Allow-Methods', '*');
    //   res.setHeader('Access-Control-Allow-Headers', '*');
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   next();
    // });
  };

  protected applyMiddlewares(): void {
    // this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  };

  protected applyRoutes(): void {
    AppRoutes.apply(this.app, this.repository, this.service);
  };

  protected createSwagger(): void {
    const swaggerJSON = JSON.parse(readFileSync(environment.swaggerJSONPath).toString());
    const swaggers = [new PaperSwagger().get(), new ModuleSwagger().get(), new TopicSwagger().get(), new QuestionSwagger().get()];
    swaggers.forEach((swaggerModel: any) => {
      for (const key in swaggerModel.paths) {
        if (swaggerModel.paths.hasOwnProperty(key)) {
          const element = swaggerModel.paths[key];
          swaggerJSON.paths[key] = element;
        }
      }
      for (const key in swaggerModel.definitions) {
        if (swaggerModel.definitions.hasOwnProperty(key)) {
          const element = swaggerModel.definitions[key];
          swaggerJSON.definitions[key] = element;
        }
      }
    });
    const options = {
      customCss: ".swagger-ui table tbody tr td:first-of-type {max-width : 30%} .swagger-ui .parameters-col_description {width:70%}",
      explorer: true,
    };
    this.app.get("/", (req: Request, res: Response) => {
      res.status(301).redirect("/swagger");
    });
    this.app.get("/swagger/v1/swagger.json", (req: Request, res: Response) => {
      res.json(JSON.stringify(swaggerJSON));
    });
    this.app.use("/swagger", serve, setup(swaggerJSON, options));
  };

}
