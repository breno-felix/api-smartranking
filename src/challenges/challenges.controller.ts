import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationParametersPipe } from 'src/common/pipes/validation-parameters.pipe';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { Challenge } from './entities/challenge.entity';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  private readonly logger = new Logger(ChallengesController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    this.logger.log(
      `createChallengeDto: ${JSON.stringify(createChallengeDto)}`,
    );
    return await this.challengesService.create(createChallengeDto);
  }

  @Put(':challenge_id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Param('challenge_id', ValidationParametersPipe) challenge_id: string,
  ): Promise<void> {
    await this.challengesService.update(challenge_id, updateChallengeDto);
  }

  @Get()
  async findAll(): Promise<Challenge[]> {
    return await this.challengesService.findAll();
  }

  @Get(':player_id')
  async findAllByPlayer(
    @Param('player_id', ValidationParametersPipe) player_id: string,
  ): Promise<Challenge[]> {
    return await this.challengesService.findAllByPlayer(player_id);
  }
}
