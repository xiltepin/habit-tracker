import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';
import { User } from './users/user.entity';
import { Habit } from './habits/habit.entity';
import { HabitEntry } from './habits/habit-entry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'habit_tracker',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'habit_tracker',
      entities: [User, Habit, HabitEntry],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    HabitsModule,
  ],
})
export class AppModule {}
