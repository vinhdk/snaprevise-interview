import { BelongsTo, Column, ForeignKey, HasMany, Table } from 'sequelize-typescript';
import { Base } from './base.model';
import { Topic } from './topic.model';
import { Paper } from './paper.model';

@Table
export class Module extends Base<Module> {
  @HasMany(() => Topic)
  public topics!: Topic[];

  @ForeignKey(() => Paper)
  @Column
  public paperId!: string;

  @BelongsTo(() => Paper, "paperId")
  public paper!: Paper;
}
