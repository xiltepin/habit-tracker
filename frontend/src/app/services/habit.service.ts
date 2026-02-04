import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Habit, HabitEntry, CreateHabitDto, CreateHabitEntryDto } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private apiUrl = `${environment.apiUrl}/habits`;

  constructor(private http: HttpClient) {}

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.apiUrl);
  }

  getHabit(id: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/${id}`);
  }

  createHabit(habit: CreateHabitDto): Observable<Habit> {
    return this.http.post<Habit>(this.apiUrl, habit);
  }

  updateHabit(id: string, habit: Partial<CreateHabitDto>): Observable<Habit> {
    return this.http.put<Habit>(`${this.apiUrl}/${id}`, habit);
  }

  deleteHabit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createEntry(habitId: string, entry: CreateHabitEntryDto): Observable<HabitEntry> {
    return this.http.post<HabitEntry>(`${this.apiUrl}/${habitId}/entries`, entry);
  }

  getEntries(habitId: string, startDate?: string, endDate?: string): Observable<HabitEntry[]> {
    let url = `${this.apiUrl}/${habitId}/entries`;
    const params = [];
    if (startDate) params.push(`startDate=${startDate}`);
    if (endDate) params.push(`endDate=${endDate}`);
    if (params.length) url += `?${params.join('&')}`;
    return this.http.get<HabitEntry[]>(url);
  }

  deleteEntry(habitId: string, entryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${habitId}/entries/${entryId}`);
  }
}
