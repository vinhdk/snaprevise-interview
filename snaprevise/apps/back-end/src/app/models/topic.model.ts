import { BelongsTo, Column, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { Base } from './base.model';
import { Module } from './module.model';
import { Question } from './question.model';

@Table
export class Topic extends Base<Topic> {
  @HasMany(() => Question)
  public questions!: Question[];

  @ForeignKey(() => Module)
  @Column
  public moduleId!: string;

  @BelongsTo(() => Module, "moduleId")
  public module!: Module;
}
