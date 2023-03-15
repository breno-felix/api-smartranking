import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdate(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createUpdate(createPlayerDto);
  }

  @Get()
  async findAll(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.findOne(email);
    }
    return await this.playersService.findAll();
  }

  @Delete()
  async remove(@Query('email') email: string): Promise<void> {
    this.playersService.remove(email);
  }
}
