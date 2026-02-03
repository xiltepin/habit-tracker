import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { HabitEntry } from './habit-entry.entity';
import { CreateHabitDto, UpdateHabitDto, CreateHabitEntryDto } from './dto/habit.dto';
import { User } from '../users/user.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
    @InjectRepository(HabitEntry)
    private habitEntryRepository: Repository<HabitEntry>,
  ) {}

  async createHabit(user: User, createHabitDto: CreateHabitDto): Promise<Habit> {
    const habit = this.habitRepository.create({
      ...createHabitDto,
      userId: user.id,
    });
    return this.habitRepository.save(habit);
  }

  async findAllHabits(user: User): Promise<Habit[]> {
    return this.habitRepository.find({
      where: { userId: user.id },
      relations: ['entries'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneHabit(id: string, user: User): Promise<Habit> {
    const habit = await this.habitRepository.findOne({
      where: { id, userId: user.id },
      relations: ['entries'],
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    return habit;
  }

  async updateHabit(id: string, user: User, updateHabitDto: UpdateHabitDto): Promise<Habit> {
    const habit = await this.findOneHabit(id, user);
    Object.assign(habit, updateHabitDto);
    return this.habitRepository.save(habit);
  }

  async deleteHabit(id: string, user: User): Promise<void> {
    const habit = await this.findOneHabit(id, user);
    await this.habitRepository.remove(habit);
  }

  async createEntry(habitId: string, user: User, createEntryDto: CreateHabitEntryDto): Promise<HabitEntry> {
    const habit = await this.findOneHabit(habitId, user);

    const existingEntry = await this.habitEntryRepository.findOne({
      where: { habitId: habit.id, date: new Date(createEntryDto.date) },
    });

    if (existingEntry) {
      existingEntry.completed = createEntryDto.completed;
      return this.habitEntryRepository.save(existingEntry);
    }

    const entry = this.habitEntryRepository.create({
      habitId: habit.id,
      date: new Date(createEntryDto.date),
      completed: createEntryDto.completed,
    });

    return this.habitEntryRepository.save(entry);
  }

  async getEntries(habitId: string, user: User, startDate?: string, endDate?: string): Promise<HabitEntry[]> {
    const habit = await this.findOneHabit(habitId, user);

    const query = this.habitEntryRepository.createQueryBuilder('entry')
      .where('entry.habitId = :habitId', { habitId: habit.id });

    if (startDate) {
      query.andWhere('entry.date >= :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('entry.date <= :endDate', { endDate });
    }

    return query.orderBy('entry.date', 'DESC').getMany();
  }

  async deleteEntry(habitId: string, entryId: string, user: User): Promise<void> {
    const habit = await this.findOneHabit(habitId, user);
    const entry = await this.habitEntryRepository.findOne({
      where: { id: entryId, habitId: habit.id },
    });

    if (!entry) {
      throw new NotFoundException('Entry not found');
    }

    await this.habitEntryRepository.remove(entry);
  }
}
