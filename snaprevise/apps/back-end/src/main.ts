import { getSequelize } from './app/configs';
import { AppModule } from './app/app.module';
import { RepositoryInjection, ServiceInjection } from './app/injections';

(async () => {
  const sequelize = await getSequelize();
  const repository = new RepositoryInjection(sequelize);
  const service = new ServiceInjection(repository);
  const app = new AppModule(repository, service);
  await app.listen();
})();
