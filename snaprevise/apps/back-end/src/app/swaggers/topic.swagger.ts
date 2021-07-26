import { BaseSwagger } from './base.swagger';

export class TopicSwagger extends BaseSwagger {
  constructor() {
    super('Topic');
    this.definitions.TopicCM.required.push('moduleId');
    this.definitions.TopicCM.properties['moduleId'] = {
      minLength: 1,
      title: "id",
      type: "string",
      format: 'uuid',
    };
    this.definitions.TopicUM.required.push('moduleId');
    this.definitions.TopicUM.properties['moduleId'] = {
      minLength: 1,
      title: "id",
      type: "string",
      format: 'uuid',
    };
  }
}
