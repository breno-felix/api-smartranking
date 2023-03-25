import { Category } from 'src/categories/entities/category.entity';
import { Challenge } from 'src/challenges/entities/challenge.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  ranking: string;

  @Column({ type: 'int', nullable: true })
  positionRanking: number;

  @Column({ nullable: true })
  urlPhoto: string;

  @ManyToOne(() => Category, (category) => category.players, { eager: true })
  category: Category;

  @OneToMany(() => Challenge, (challenge) => challenge.requester)
  sentChallenges: Challenge[];

  @OneToMany(() => Challenge, (challenge) => challenge.requested)
  receivedChallenges: Challenge[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
