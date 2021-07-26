import { IBase } from './base.interface';
import { ITopic } from './topic.interface';

export interface IQuestion extends IBase {
  topic: ITopic
}

export interface IQuestionCM extends IBase {
  topicId: string;
}

export interface IQuestionUM extends IBase {
  topicId: string;
}

