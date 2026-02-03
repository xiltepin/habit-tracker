import { IsNotEmpty, IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class CreateHabitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;
}

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;
}

export class CreateHabitEntryDto {
  @IsDateString()
  date: string;

  @IsBoolean()
  completed: boolean;
}

export class UpdateHabitEntryDto {
  @IsBoolean()
  completed: boolean;
}
