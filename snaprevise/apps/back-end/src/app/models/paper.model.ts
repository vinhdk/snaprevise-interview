import { HasMany, Table } from 'sequelize-typescript';
import { Base } from './base.model';
import { Module } from './module.model';

@Table
export class Paper extends Base<Paper> {
  @HasMany(() => Module)
  public modules!: Module[];
}
