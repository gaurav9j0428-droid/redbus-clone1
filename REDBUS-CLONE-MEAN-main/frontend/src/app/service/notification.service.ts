import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: string[] = [];

  add(message: string) {
    this.notifications.unshift(message);
  }

  getAll() {
    return this.notifications;
  }

  clear() {
    this.notifications = [];
  }
}