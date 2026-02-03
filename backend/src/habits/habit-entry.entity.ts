import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Habit } from './habit.entity';

@Entity('habit_entries')
@Unique(['habitId', 'date'])
export class HabitEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  habitId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: true })
  completed: boolean;

  @ManyToOne(() => Habit, habit => habit.entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'habitId' })
  habit: Habit;

  @CreateDateColumn()
  createdAt: Date;
}
