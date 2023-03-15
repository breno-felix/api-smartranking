import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdate(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const player = this.players.find((player) => player.email === email);

    if (player) {
      this.update(player, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async findOne(email: string): Promise<Player> {
    const player = this.players.find((player) => player.email === email);
    if (!player) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }
    return player;
  }

  async remove(email: string): Promise<void> {
    this.players = this.players.filter((player) => player.email !== email);
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { phoneNumber, email, name } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      phoneNumber,
      email,
      name,
      ranking: 'A',
      positionRanking: 1,
      urlPhoto: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(player: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;

    player.name = name;
  }
}
