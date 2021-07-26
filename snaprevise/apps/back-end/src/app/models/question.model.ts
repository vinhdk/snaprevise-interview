import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Base } from './base.model';
import { Topic } from './topic.model';

@Table
export class Question extends Base<Question> {
  @ForeignKey(() => Topic)
  @Column
  public topicId!: string;

  @BelongsTo(() => Topic, "topicId")
  public topic!: Topic;
}
