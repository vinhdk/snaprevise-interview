import { IBase } from './base.interface';
import { ITopic } from './topic.interface';

export interface IQuestion extends IBase {
  topic: ITopic
}
