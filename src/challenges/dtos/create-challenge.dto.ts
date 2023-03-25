import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateChallengeDto {
  @IsDateString()
  @IsNotEmpty()
  challendeDateAndTime: Date;

  @IsNotEmpty()
  @IsUUID()
  requester: string;

  @IsNotEmpty()
  @IsUUID()
  requested: string;
}
