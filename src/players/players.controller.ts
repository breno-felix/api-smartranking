import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParametersPipe } from './pipes/players-validation-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUpdate(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createUpdate(createPlayerDto);
  }

  @Get()
  async findAll(
    @Query('email', PlayersValidationParametersPipe) email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.findOne(email);
    }
    return await this.playersService.findAll();
  }

  @Delete()
  async remove(
    @Query('email', PlayersValidationParametersPipe) email: string,
  ): Promise<void> {
    this.playersService.remove(email);
  }
}
