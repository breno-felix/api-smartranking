import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ChallengesController } from './challenges.controller';
import { challengeProviders } from './challenges.providers';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChallengesController],
  providers: [...challengeProviders, ChallengesService],
})
export class ChallengesModule {}
