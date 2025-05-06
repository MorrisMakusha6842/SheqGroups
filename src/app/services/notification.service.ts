import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'system' | 'inventory' | 'alert';
  isRead: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications: Notification[] = [];
  private notifications = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notifications.asObservable();

  private unreadCount = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCount.asObservable();

  getNotifications(): Notification[] {
    return this._notifications;
  }

  updateNotifications(notifications: Notification[]): void {
    this._notifications = notifications;
    this.notifications.next(notifications);
    this.updateUnreadCount(notifications);
  }

  private updateUnreadCount(notifications: Notification[]): void {
    const count = notifications.filter(n => !n.isRead).length;
    this.unreadCount.next(count);
  }
} 