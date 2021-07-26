import { BaseService } from './base.service';
import { ModuleRepository } from '../repositories';
import { Module } from '../models';
import { IModuleService } from '../interfaces';

export class ModuleService extends BaseService<Module, ModuleRepository> implements IModuleService {
  constructor(
    protected readonly repository: ModuleRepository
  ) {
    super(repository);
  }
}
