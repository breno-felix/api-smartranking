import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { ValidationParametersPipe } from '../common/pipes/validation-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return await this.playersService.create(createPlayerDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id', ValidationParametersPipe) id: string,
  ): Promise<void> {
    await this.playersService.update(id, updatePlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return await this.playersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidationParametersPipe) id: string,
  ): Promise<Player> {
    return await this.playersService.findOne(id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidationParametersPipe) id: string,
  ): Promise<void> {
    this.playersService.remove(id);
  }
}
