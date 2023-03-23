import { DataSource } from 'typeorm';
import { Challenge } from './entities/challenge.entity';

export const challengeProviders = [
  {
    provide: 'CHALLENGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Challenge),
    inject: ['DATA_SOURCE'],
  },
];
