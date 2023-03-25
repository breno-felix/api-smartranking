import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlayersModule } from 'src/players/players.module';
import { ChallengesController } from './challenges.controller';
import { challengeProviders } from './challenges.providers';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [DatabaseModule, PlayersModule],
  controllers: [ChallengesController],
  providers: [...challengeProviders, ChallengesService],
})
export class ChallengesModule {}
