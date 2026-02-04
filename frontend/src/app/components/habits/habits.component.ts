import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HabitService } from '../../services/habit.service';
import { Habit, HabitEntry } from '../../models/habit.model';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  entries: Map<string, boolean>; // habitId -> completed
}

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  calendar: CalendarDay[][] = [];
  currentDate = new Date();
  showAddModal = false;
  habitForm: FormGroup;
  selectedColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  constructor(
    private habitService: HabitService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.habitForm = this.fb.group({
      name: ['', Validators.required],
      color: [this.selectedColors[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadHabits();
  }

  loadHabits(): void {
    this.habitService.getHabits().subscribe({
      next: (habits) => {
        this.habits = habits;
        this.generateCalendar();
      },
      error: (err) => console.error('Error loading habits:', err)
    });
  }

  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const calendar: CalendarDay[][] = [];
    let week: CalendarDay[] = [];
    
    const currentDate = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    while (currentDate <= lastDay || week.length > 0) {
      const entries = new Map<string, boolean>();
      
      this.habits.forEach(habit => {
        const dateStr = this.formatDate(currentDate);
        const entry = habit.entries?.find(e => 
          this.formatDate(new Date(e.date)) === dateStr
        );
        if (entry) {
          entries.set(habit.id, entry.completed);
        }
      });
      
      week.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.getTime() === today.getTime(),
        entries
      });
      
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
      
      if (currentDate > lastDay && week.length === 0) break;
    }
    
    this.calendar = calendar;
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  toggleHabitForDay(habit: Habit, day: CalendarDay): void {
    if (!day.isCurrentMonth) return;
    
    const currentStatus = day.entries.get(habit.id) ?? false;
    const dateStr = this.formatDate(day.date);
    
    this.habitService.createEntry(habit.id, {
      date: dateStr,
      completed: !currentStatus
    }).subscribe({
      next: () => {
        this.loadHabits();
      },
      error: (err) => console.error('Error toggling habit:', err)
    });
  }

  onAddHabit(): void {
    if (this.habitForm.invalid) return;
    
    const { name, color } = this.habitForm.value;
    
    this.habitService.createHabit({ name, color }).subscribe({
      next: () => {
        this.loadHabits();
        this.showAddModal = false;
        this.habitForm.reset({ color: this.selectedColors[0] });
      },
      error: (err) => console.error('Error creating habit:', err)
    });
  }

  deleteHabit(habit: Habit): void {
    if (!confirm(`Delete "${habit.name}"?`)) return;
    
    this.habitService.deleteHabit(habit.id).subscribe({
      next: () => {
        this.loadHabits();
      },
      error: (err) => console.error('Error deleting habit:', err)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getMonthYear(): string {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  getDayName(index: number): string {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index];
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getStreak(habit: Habit): number {
    if (!habit.entries || habit.entries.length === 0) return 0;
    
    const sortedEntries = [...habit.entries]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (entryDate.getTime() === expectedDate.getTime() && sortedEntries[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
}
