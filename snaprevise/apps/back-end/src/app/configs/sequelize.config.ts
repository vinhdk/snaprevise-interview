import { Sequelize } from 'sequelize-typescript';
import { Module, Paper, Question, Topic } from '../models';

export const getSequelize = async (): Promise<Sequelize> => {
  let sequelize: Sequelize;
  sequelize = new Sequelize({
    models: [Paper, Module, Topic, Question],
    dialect: 'postgres',
    host: 'localhost',
    name: 'snaprevise',
    password: '123456cb',
    repositoryMode: true,
    username: 'postgres',
    validateOnly: false,
  } as any);
  await sequelize.sync();
  return sequelize;
}
