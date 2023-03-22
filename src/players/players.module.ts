import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from './players.providers';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlayersController],
  providers: [...playerProviders, PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
