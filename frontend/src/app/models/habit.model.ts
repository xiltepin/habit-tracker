export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Habit {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: Date;
  entries?: HabitEntry[];
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
}

export interface CreateHabitDto {
  name: string;
  color?: string;
}

export interface CreateHabitEntryDto {
  date: string;
  completed: boolean;
}
