import { IDefinition, IPath } from '../interfaces';
import { AppRoutes } from '../app.routing';

export abstract class BaseSwagger {

  public paths: IPath;
  public definitions: IDefinition;

  protected constructor(
    protected readonly name: string,
  ) {
    this.init();
  }

  protected init(): void {
    this.generatePaths();
    this.generateDefinitions();
  }

  public get(): { paths: IPath, definitions: IDefinition } {
    return {
      paths: this.paths,
      definitions: this.definitions
    };
  }

  public generatePaths(): void {
    this.paths = {
      [`${AppRoutes.ROUTE}${this.name}`]: {
        get: {
          tags: [this.name],
          operationId: `${this.name}_Get`,
          consumes: [
            "application/json",
            "application/json-patch+json",
            "text/json",
            "application/*+json",

          ],
          responses: {
            200: {
              "x-nullable": true,
              "description": "",
            },
          },
        },
        post: {
          tags: [this.name],
          operationId: `${this.name}_Post`,
          consumes: [
            "application/json",
            "application/json-patch+json",
            "text/json",
            "application/*+json",

          ],
          parameters: [{
            "name": "model",
            "in": "body",
            "required": true,
            "schema": {
              $ref: `#/definitions/${this.name}CM`,
            },
            "x-nullable": false,
          }],
          responses: {
            200: {
              "x-nullable": true,
              "description": "",
            },
          },
        },
        put: {
          tags: [this.name],
          operationId: `${this.name}_Put`,
          consumes: [
            "application/json",
            "application/json-patch+json",
            "text/json",
            "application/*+json",

          ],
          parameters: [{
            "name": "model",
            "in": "body",
            "required": true,
            "schema": {
              $ref: `#/definitions/${this.name}UM`,
            },
            "x-nullable": false,
          }],
          responses: {
            200: {
              "x-nullable": true,
              "description": "",
            },
          },
        },
      },
      [`${AppRoutes.ROUTE}${this.name}/{id}`]: {
        get: {
          tags: [this.name],
          operationId: `${this.name}_GetById`,
          consumes: [
            "application/json",
            "application/json-patch+json",
            "text/json",
            "application/*+json",

          ],
          parameters: [{
            "name": "id",
            "in": "path",
            "type": "string",
            "format": "uuid",
            "required": true,
            "x-nullable": false,
          }],
          responses: {
            200: {
              "x-nullable": true,
              "description": "",
            },
          },
        },
        delete: {
          tags: [this.name],
          operationId: `${this.name}_Delete`,
          consumes: [
            "application/json",
            "application/json-patch+json",
            "text/json",
            "application/*+json",

          ],
          parameters: [{
            "name": "id",
            "in": "path",
            "type": "string",
            "format": "uuid",
            "required": true,
            "x-nullable": false,
          }],
          responses: {
            200: {
              "x-nullable": true,
              "description": "",
            },
          },
        },
      },
    };
  }

  public generateDefinitions(): void {
    this.definitions = {
      [`${this.name}CM`]: {
        additionalProperties: false,
        properties: {
          title: {
            minLength: 1,
            title: "title",
            type: "string",
          },
          position: {
            minLength: 1,
            title: "position",
            type: "number",
          },
        },
        required: [
          'title',
          'position'
        ],
        type: 'object'
      },
      [`${this.name}UM`]: {
        additionalProperties: false,
        properties: {
          id: {
            minLength: 1,
            title: "id",
            type: "string",
            format: 'uuid',
          },
          title: {
            minLength: 1,
            title: "title",
            type: "string",
          },
          position: {
            minLength: 1,
            title: "position",
            type: "number",
          },
        },
        required: [
          'id',
          'title',
          'position'
        ],
        type: 'object'
      }
    }
  }
}
