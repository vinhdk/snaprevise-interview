import { IBase } from './base.interface';
import { IQuestion } from './question.interface';
import { IModule } from './module.interface';

export interface ITopic extends IBase {
  questions: IQuestion[];
  module: IModule;
}
