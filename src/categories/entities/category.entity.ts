import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../interfaces/category.interface';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  category: string;

  @Column()
  description: string;

  @Column('simple-json')
  events: Event[];

  @OneToMany(() => Player, (player) => player.category, {
    cascade: ['insert', 'update'],
  })
  players: Player[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
