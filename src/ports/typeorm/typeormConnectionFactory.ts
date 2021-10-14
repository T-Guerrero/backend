import { ProfileEntity } from './entities/profile.entity';
import { createConnection } from 'typeorm';

export const typeormConnectionFactory = () => {
  return createConnection({
    type: 'sqlite',
    database: './tmp/dev.sqlite',
    synchronize: true,
    entities: [ProfileEntity],
  });
};
