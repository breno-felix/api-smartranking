import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PlayersModule, DatabaseModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
