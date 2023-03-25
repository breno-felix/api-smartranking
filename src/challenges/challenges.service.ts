import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { ChallengeStatus } from './interfaces/challenge-status.enum';

@Injectable()
export class ChallengesService {
  constructor(
    @Inject('CHALLENGE_REPOSITORY')
    private readonly challengeRepository: Repository<Challenge>,
    private readonly playersService: PlayersService,
  ) {}

  private readonly logger = new Logger(ChallengesService.name);

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const { requester, requested, challendeDateAndTime } = createChallengeDto;
    const requesterPlayer = await this.playersService.findOne(requester);
    const requestedPlayer = await this.playersService.findOne(requested);

    if (!requesterPlayer.category || !requestedPlayer.category) {
      throw new BadRequestException(
        `The requester and the requested must be registered in a category!`,
      );
    }

    if (
      requesterPlayer.category.category !== requestedPlayer.category.category
    ) {
      throw new BadRequestException(
        `The requester and the requested must be registered in a same category!`,
      );
    }

    const challenge = {
      challendeDateAndTime: new Date(challendeDateAndTime),
      requestDateAndTime: new Date(),
      requester: requesterPlayer,
      requested: requestedPlayer,
      category: requesterPlayer.category,
      status: ChallengeStatus.PENDING,
    };

    const createChallenge = this.challengeRepository.create(challenge);

    const saveChallenge = await this.challengeRepository.save(createChallenge);

    this.logger.log(`createChallenge: ${JSON.stringify(saveChallenge)}`);

    return saveChallenge;
  }

  async findAll(): Promise<Challenge[]> {
    return await this.challengeRepository.find({
      relations: ['requester', 'requested', 'category'],
    });
  }
}
