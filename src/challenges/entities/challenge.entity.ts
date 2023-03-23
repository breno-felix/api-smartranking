import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Match } from '../interfaces/challenge.interface';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  challendeDateAndTime: Date;

  @Column()
  requestDateAndTime: Date;

  @Column()
  responseDateAndTime: Date;

  @Column()
  status: string;

  @Column()
  category: string;

  @ManyToOne(() => Player, (player) => player.sentChallenges, {
    cascade: ['insert', 'update'],
  })
  requester: Player;

  @ManyToOne(() => Player, (player) => player.receivedChallenges, {
    cascade: ['insert', 'update'],
  })
  requested: Player;

  @Column('simple-json')
  match: Match;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
