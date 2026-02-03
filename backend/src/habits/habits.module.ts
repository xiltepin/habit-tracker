import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { Habit } from './habit.entity';
import { HabitEntry } from './habit-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitEntry])],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
