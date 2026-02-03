import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { HabitEntry } from './habit-entry.entity';

@Entity('habits')
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '#3b82f6' })
  color: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, user => user.habits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => HabitEntry, entry => entry.habit)
  entries: HabitEntry[];

  @CreateDateColumn()
  createdAt: Date;
}
