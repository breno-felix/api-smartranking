import { Player } from 'src/players/entities/player.entity';
import { ChallengeStatus } from './challenge-status.enum';

export interface Challenge {
  challendeDateAndTime: Date;
  requestDateAndTime: Date;
  responseDateAndTime: Date;
  requester: Player;
  requested: Player;
  category: string;
  status: ChallengeStatus;
  match: Match;
}

export interface Match {
  category: string;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
