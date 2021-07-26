import { IBase } from './base.interface';
import { ITopic } from './topic.interface';
import { IPaper } from './paper.interface';

export interface IModule extends IBase {
  topics: ITopic[];
  paper: IPaper;
}

export interface IModuleCM extends IBase {
  paperId: string;
}

export interface IModuleUM extends IBase {
  paperId: string;
}
