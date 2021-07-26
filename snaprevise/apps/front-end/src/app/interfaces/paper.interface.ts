import { IBase } from './base.interface';
import { IModule } from './module.interface';

export interface IPaper extends IBase {
  modules: IModule[];
}

export interface IPaperCM extends IBase {
}

export interface IPaperUM extends IBase {
}
