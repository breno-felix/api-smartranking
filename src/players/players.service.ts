import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private readonly playerRepository: Repository<Player>,
  ) {}

  async createUpdate(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const player = await this.playerRepository.findOne({ where: { email } });

    if (player) {
      this.update(player, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findOne(email: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { email } });
    if (!player) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }
    return player;
  }

  async remove(email: string): Promise<void> {
    const player = await this.playerRepository.findOne({
      where: { email },
    });

    if (!player) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    this.playerRepository.remove(player);
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { phoneNumber, email, name } = createPlayerDto;

    const player = this.playerRepository.create({
      phoneNumber,
      email,
      name,
      ranking: 'A',
      positionRanking: 1,
      urlPhoto: 'www.google.com.br/foto123.jpg',
    });
    return await this.playerRepository.save(player);
  }

  private async update(
    player: Player,
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const { name } = createPlayerDto;

    player.name = name;

    return await this.playerRepository.save(player);
  }
}
