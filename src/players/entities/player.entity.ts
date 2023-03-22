import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
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

  @ManyToOne(() => Category, (category) => category.players, {
    cascade: ['insert', 'update'],
  })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
