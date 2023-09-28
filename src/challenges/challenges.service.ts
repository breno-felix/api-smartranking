import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
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
    const { requester, requested, challengeDateAndTime } = createChallengeDto;
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
      challengeDateAndTime: new Date(challengeDateAndTime),
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

  async update(
    challenge_id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {
    const existChallenge = await this.challengeRepository.findOne({
      where: { id: challenge_id },
    });

    if (!existChallenge) {
      throw new NotFoundException(
        `The challenge with id ${challenge_id} not found`,
      );
    }

    const { challengeDateAndTime, status } = updateChallengeDto;

    existChallenge.challengeDateAndTime = challengeDateAndTime;
    existChallenge.status = status;

    await this.challengeRepository.save(existChallenge);
  }

  async findAll(): Promise<Challenge[]> {
    return await this.challengeRepository.find({
      relations: ['requester', 'requested', 'category'],
    });
  }

  async findAllByPlayer(player_id: string): Promise<Challenge[]> {
    await this.playersService.findOne(player_id);

    const challenges = await this.challengeRepository.find({
      where: [
        { requester: { id: player_id } },
        { requested: { id: player_id } },
      ],
      relations: ['requester', 'requested', 'category'],
    });

    return challenges;
  }
}
