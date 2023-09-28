import { Category } from 'src/categories/entities/category.entity';
import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';
import { Match } from '../interfaces/challenge.interface';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  challengeDateAndTime: Date;

  @Column({ type: 'timestamp' })
  requestDateAndTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  responseDateAndTime: Date;

  @Column()
  status: ChallengeStatus;

  @ManyToOne(() => Category, (category) => category.challenges)
  category: Category;

  @ManyToOne(() => Player, (player) => player.sentChallenges)
  requester: Player;

  @ManyToOne(() => Player, (player) => player.receivedChallenges)
  requested: Player;

  @Column({ type: 'simple-json', nullable: true })
  match: Match;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
