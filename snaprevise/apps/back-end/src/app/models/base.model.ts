import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Base<T> extends Model<T> {

  @PrimaryKey
  @Column
  public id!: string;

  @Column
  public title!: string;

  @Column
  public position!: number;
}
