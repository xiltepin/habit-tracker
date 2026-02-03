import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto, UpdateHabitDto, CreateHabitEntryDto } from './dto/habit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Post()
  createHabit(@Request() req, @Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.createHabit(req.user, createHabitDto);
  }

  @Get()
  findAllHabits(@Request() req) {
    return this.habitsService.findAllHabits(req.user);
  }

  @Get(':id')
  findOneHabit(@Param('id') id: string, @Request() req) {
    return this.habitsService.findOneHabit(id, req.user);
  }

  @Put(':id')
  updateHabit(@Param('id') id: string, @Request() req, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitsService.updateHabit(id, req.user, updateHabitDto);
  }

  @Delete(':id')
  deleteHabit(@Param('id') id: string, @Request() req) {
    return this.habitsService.deleteHabit(id, req.user);
  }

  @Post(':id/entries')
  createEntry(@Param('id') id: string, @Request() req, @Body() createEntryDto: CreateHabitEntryDto) {
    return this.habitsService.createEntry(id, req.user, createEntryDto);
  }

  @Get(':id/entries')
  getEntries(
    @Param('id') id: string,
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.habitsService.getEntries(id, req.user, startDate, endDate);
  }

  @Delete(':id/entries/:entryId')
  deleteEntry(@Param('id') id: string, @Param('entryId') entryId: string, @Request() req) {
    return this.habitsService.deleteEntry(id, entryId, req.user);
  }
}
