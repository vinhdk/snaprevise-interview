import { BaseRepository } from './base.repository';
import { Module } from '../models';
import { Sequelize } from 'sequelize-typescript';
import { IModuleRepository } from '../interfaces';

export class ModuleRepository extends BaseRepository<Module> implements IModuleRepository {
  constructor(sequelize: Sequelize) {
    super(Module, sequelize);
  }
}
