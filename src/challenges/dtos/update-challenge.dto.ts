import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ChallengeStatusToUpdate } from '../interfaces/challenge-status-to-update.enum';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class UpdateChallengeDto {
  @IsOptional()
  @IsDateString()
  challengeDateAndTime: Date;

  @IsOptional()
  @IsEnum(ChallengeStatusToUpdate)
  status: ChallengeStatus;
}
