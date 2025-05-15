import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit {

  activeTab: string = 'schedule';
  schedules: any[] = [];
  newSchedule: any = {};
  viewedDate: Date = new Date();
  calendarHeader: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDates: Date[] = [];
  hoveredDate: Date | null = null;

  constructor() { }

  ngOnInit(): void {
    this.generateCalendarDates();
  }

  // Methods will be implemented here
  addSchedule(newSchedule: any): void {
    this.schedules.push({ ...newSchedule, id: Date.now() });
    this.newSchedule = {};
    this.generateCalendarDates(); // Refresh calendar
  }

  previousMonth(): void {
    this.viewedDate = new Date(this.viewedDate.getFullYear(), this.viewedDate.getMonth() - 1, 1);
    this.generateCalendarDates();
  }

  nextMonth(): void {
    this.viewedDate = new Date(this.viewedDate.getFullYear(), this.viewedDate.getMonth() + 1, 1);
    this.generateCalendarDates();
  }

  generateCalendarDates(): void {
    const year = this.viewedDate.getFullYear();
    const month = this.viewedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.calendarDates = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.calendarDates.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDates.push(new Date(year, month, i));
    }
  }

  hasSchedule(date: Date): boolean {
    return this.schedules.some(schedule => 
      new Date(schedule.date).toDateString() === date.toDateString()
    );
  }

  getSchedulesForDate(date: Date): any[] {
    return this.schedules.filter(schedule => 
      new Date(schedule.date).toDateString() === date.toDateString()
    );
  }
} 

