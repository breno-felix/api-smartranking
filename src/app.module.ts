import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [PlayersModule, DatabaseModule, CategoriesModule, ChallengesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
