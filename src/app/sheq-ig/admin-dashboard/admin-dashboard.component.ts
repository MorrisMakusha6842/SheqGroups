import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminOverviewComponent } from '../admin-sheq/admin-overview/admin-overview.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { SheqIgComponent } from '../sheq-ig.component';

interface TrainingCourse {
  name: string;
  progress: number;
  status: 'Completed' | 'Due Soon' | 'In Progress';
  dueDate?: Date;
  imageUrl: string;
}

interface Qualification {
  name: string;
  validUntil: Date;
  documentUrl: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ CommonModule, FormsModule, AdminOverviewComponent, SheqIgComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  adminName: string;
  training: TrainingCourse[] =[];
  viewedDate = new Date();
  calendarHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  hoveredDate: Date | null = null;
  calendarDates: (Date | null)[] = [];
  schedules: any[] = [];
  private reminderCheckInterval: any;
  activeTab: string = 'training';
  newSchedule: any = {
    title: '',
    date: '',
    recurrence: 'None',
    priority: 'Medium',
    description: ''
  };
  // Summary card data
  completedCount = 0;
  lastCompletedDate?: Date;
  inProgressCount = 0;
  avgProgress = 0;
  nextCourse = '';
  dueSoonCount = 0;
  nextDueDate?: Date;
  certificationsCount = 0;
  recentCertifications: Qualification[] = [];
  complianceRate = 0;
  hoursLogged = 16;
  targetHours = 20;


  // Add after component initialization
  constructor() {
  this.generateCalendar();
  this.newSchedule = {
    title: '',
    date: '',
    recurrence: 'None',
    priority: 'Medium',
    description: 'no discription provided'
  };
  // Add dummy schedules
  this.schedules = [
    { title: 'Safety Review', date: new Date('2024-03-15T09:00')  },
    { title: 'Equipment Audit', date: new Date('2024-03-20T14:00')  },
    { title: 'Team Training', date: new Date('2024-03-22T10:30') },
    { title: 'Safety Review', date: new Date('2024-03-15T09:00')  },
    { title: 'Equipment Audit', date: new Date('2024-03-20T14:00')  },
    { title: 'Team Training', date: new Date('2024-03-22T10:30') },
    { title: 'Team Training', date: new Date('2024-03-22T10:30') },
    { title: 'Team Training', date: new Date('2024-03-22T10:30') },
  ];

  this.schedules = [
    { title: 'Safety Review', date: new Date('2025-05-15T09:00') },
    { title: 'Equipment Audit', date: new Date('2025-05-20T14:00') },
    // Add test dates
    { title: 'Test Event 1', date: new Date('2025-05-10T11:00') },
    { title: 'Team Workshop', date: new Date('2025-05-12T13:30') },
    // ... rest of existing schedules ...
  ];
}


calculateTrainingMetrics() {
  const completed = this.training.filter(c => c.status === 'Completed');
  const inProgress = this.training.filter(c => c.status === 'In Progress');
  
  this.completedCount = completed.length;
  this.inProgressCount = inProgress.length;
  this.avgProgress = inProgress.length > 0 
    ? Math.round(inProgress.reduce((sum, c) => sum + c.progress, 0) / inProgress.length)
    : 0;
    
  this.lastCompletedDate = completed.length > 0 
    ? completed.reduce((latest, c) => c.dueDate > latest ? c.dueDate : latest, completed[0].dueDate)
    : undefined;

  // Add similar calculations for other metrics
   // Upcoming deadlines
   const dueSoon = this.training.filter(c => c.status === 'Due Soon' && 
    c.dueDate && this.daysUntil(c.dueDate) <= 7);
  this.dueSoonCount = dueSoon.length;
  this.nextDueDate = dueSoon.length > 0 
    ? dueSoon.reduce((min, c) => c.dueDate < min ? c.dueDate : min, dueSoon[0].dueDate)
    : undefined;

  // Certifications
  this.certificationsCount = this.qualifications.length;
  this.recentCertifications = this.qualifications.slice(-3);

  // Compliance Rate (example calculation)
  const totalMandatory = this.training.length;
  this.complianceRate = Math.round((this.completedCount / totalMandatory) * 100);

  // Training Hours (static values for example)
  this.hoursLogged = 16;
  this.targetHours = 20;
}

// Add helper method
private daysUntil(date: Date): number {
  const diff = date.getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}


ngOnInit(): void {
  this.training = [ { name: 'Safety Fundamentals', progress: 100, status: 'Completed', imageUrl: 'assets/images/edash-01.jfif' },
                    { name: 'Heavy Machinery', progress: 75, status: 'In Progress', imageUrl: 'assets/images/edash-02.jfif' },
                    { name: 'Fire Safety', progress: 30, status: 'Due Soon', dueDate: new Date('2024-08-01'), imageUrl: 'assets/images/edash-03.jfif' }];
  this.calculateTrainingMetrics();
}



  @Input() employee = {
    name: 'John Doe',
    jobTitle: 'Site Supervisor',
    staffId: 'SHQ-0456',
    workSite: 'Main Construction Site A',
    status: 'Active',
    hireDate: new Date('2020-06-15'),
    contractType: 'Full-Time',
    permissions: ['Site Access', 'Equipment Operation', 'Safety Oversight']
  };

  previousMonth() {
    this.viewedDate = new Date(this.viewedDate.getFullYear(), this.viewedDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.viewedDate = new Date(this.viewedDate.getFullYear(), this.viewedDate.getMonth() + 1, 1);
    this.generateCalendar();
  }


  
  private generateCalendar() {
    const year = this.viewedDate.getFullYear();
    const month = this.viewedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const calendar: (Date | null)[] = [];
    
    // Add empty days from previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
      calendar.push(null);
    }
  
    // Add current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      calendar.push(new Date(year, month, day));
    }
  
    this.calendarDates = calendar;
  }
  
  hasSchedule(date: Date): boolean {
    return this.schedules.some(s => 
      s.date.getFullYear() === date.getFullYear() &&
      s.date.getMonth() === date.getMonth() &&
      s.date.getDate() === date.getDate()
    );
  }
  
  getSchedulesForDate(date: Date): any[] {
    return this.schedules.filter(s => 
      s.date.getFullYear() === date.getFullYear() &&
      s.date.getMonth() === date.getMonth() &&
      s.date.getDate() === date.getDate()
    );
  }

  qualifications: Qualification[] = [
    { name: 'Construction Safety', validUntil: new Date('2025-12-31'), documentUrl: '#cert1' },
    { name: 'First Aid Level 3', validUntil: new Date('2024-06-30'), documentUrl: '#cert2' }
  ];

  addSchedule(form: any) {
    if (form.invalid) return;
    
    const newSchedule = {
      title: this.newSchedule.title,
      date: new Date(this.newSchedule.date),
      recurrence: this.newSchedule.recurrence,
      priority: this.newSchedule.priority,
      description: this.newSchedule.description
    };  

    this.schedules.push(newSchedule);
    this.scheduleReminderCheck();
  }
  
  deleteSchedule(schedule: any) {
    this.schedules = this.schedules.filter(s => s !== schedule);
  }
  
  syncWithCalendar(schedule: any) {
    // Implement calendar sync logic
    console.log('Syncing schedule:', schedule);
    // This should integrate with your calendar service
  }
  
  private scheduleReminderCheck() {
    if (!this.reminderCheckInterval) {
      this.reminderCheckInterval = setInterval(() => {
        this.checkReminders();
      }, 60000);
    }
  }
  
  private checkReminders() {
    const now = new Date();
    this.schedules.forEach(schedule => {
      const hoursLeft = Math.abs(now.getTime() - schedule.date.getTime()) / 36e5;
      
      schedule.timeLeft = Math.max(0, 100 - (hoursLeft / 24 * 100));
      
      if (hoursLeft < 24) {
        schedule.alertLevel = 'danger';
      } else if (hoursLeft < 72) {
        schedule.alertLevel = 'warning';
      } else {
        schedule.alertLevel = 'info';
      }
  
      if (hoursLeft < 2) {
        // Send to notifications
        this.sendNotification({
          title: 'Upcoming Schedule',
          message: `${schedule.title} starts soon`,
          level: schedule.alertLevel,
          timestamp: new Date()
        });
      }
    });
  }
  
  private sendNotification(notification: any) {
    // Implement notification service integration
    console.log('Sending notification:', notification);
    // This should connect to your existing notification component
  }
}

