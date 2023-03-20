import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('PLAYER_REPOSITORY')
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email, phoneNumber } = createPlayerDto;

    const existPlayer = await this.playerRepository.findOne({
      where: { email },
    });

    if (existPlayer) {
      throw new BadRequestException(
        `Player with e-mail ${email} already exist`,
      );
    }

    const player = this.playerRepository.create(createPlayerDto);

    return await this.playerRepository.save(player);
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const player = await this.playerRepository.findOne({ where: { id } });

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    const { name } = updatePlayerDto;

    player.name = name;

    await this.playerRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  async remove(id: string): Promise<void> {
    const player = await this.playerRepository.findOne({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    this.playerRepository.remove(player);
  }
}
