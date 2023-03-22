import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from './categories.providers';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule, PlayersModule],
  controllers: [CategoriesController],
  providers: [...categoryProviders, CategoriesService],
})
export class CategoriesModule {}
