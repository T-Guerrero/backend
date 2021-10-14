import express, { Application, json } from 'express';

import { IProfileDataPort } from 'domain/ports/profileDataPort';
import { ProfileController } from 'controllers/profile.controller';
import { ProfileEntity } from 'ports/typeorm/entities/profile.entity';
import ProfileUseCases from 'domain/profileUseCases';
import { TypeORMProfileDataPort } from 'ports/typeorm/impl/typeormProfileDataPort';
import cors from 'cors';
import { typeormConnectionFactory } from 'ports/typeorm/typeormConnectionFactory';

const main = async () => {
  const app: Application = express();
  app.use(json());
  app.use(cors());

  const conn = await typeormConnectionFactory();
  ProfileEntity.useConnection(conn);

  const port: IProfileDataPort = new TypeORMProfileDataPort(conn);

  const profileUseCases = new ProfileUseCases(port);

  const controller = new ProfileController(profileUseCases, port);

  app.use('/profile', controller.router);

  app.listen(3000, () => {
    console.log('Server Running on 3000!!');
  });
};

main();
