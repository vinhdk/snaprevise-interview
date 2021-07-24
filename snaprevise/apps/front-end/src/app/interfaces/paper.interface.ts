import { IBase } from './base.interface';
import { IModule } from './module.interface';

export interface IPaper extends IBase {
  modules: IModule[];
}
