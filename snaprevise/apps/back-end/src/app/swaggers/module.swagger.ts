import { BaseSwagger } from './base.swagger';

export class ModuleSwagger extends BaseSwagger {
  constructor() {
    super('Module');
    this.definitions.ModuleCM.required.push('paperId');
    this.definitions.ModuleCM.properties['paperId'] = {
      minLength: 1,
      title: "id",
      type: "string",
      format: 'uuid',
    };
    this.definitions.ModuleUM.required.push('paperId');
    this.definitions.ModuleUM.properties['paperId'] = {
      minLength: 1,
      title: "id",
      type: "string",
      format: 'uuid',
    };
  }
}
