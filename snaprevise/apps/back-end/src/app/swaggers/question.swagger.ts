import { BaseSwagger } from './base.swagger';

export class QuestionSwagger extends BaseSwagger {
  constructor() {
    super('Question');
    this.definitions.QuestionCM.required.push('topicId');
    this.definitions.QuestionCM.properties['topicId'] = {
      minLength: 1,
      title: "id",
      type: "string",
      format: 'uuid',
    };
    this.definitions.QuestionUM.required.push('topicId');
    this.definitions.QuestionUM.properties['topicId'] = {
      minLength: 1,
      title: "id",
      type: "string",
      format: 'uuid',
    };
  }
}
