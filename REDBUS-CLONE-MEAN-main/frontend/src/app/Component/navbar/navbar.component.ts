import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NotificationService } from '../../service/notification.service';
declare var google: any;

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private overlay: OverlayContainer,
    private notificationService: NotificationService
  ) {}

  isloggedIn: boolean = false;
  notifications: string[] = [];
  showNotifications = false;

  // ✅ INIT
  ngOnInit(): void {

    this.isloggedIn = !!sessionStorage.getItem("Loggedinuser");

    // 🔥 APPLY SAVED THEME
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      this.overlay.getContainerElement().classList.add('dark');
    }

    this.notificationService.add("Site Loaded");
    this.loadNotifications();
  }

  // ⭐ Toggle Dark Mode
  toggleDarkMode() {

    document.documentElement.classList.toggle('dark');

    const isDark = document.documentElement.classList.contains('dark');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
      this.overlay.getContainerElement().classList.add('dark');
    } else {
      this.overlay.getContainerElement().classList.remove('dark');
    }
  }

  // ⭐ Notifications
  loadNotifications() {
    this.notifications = this.notificationService.getAll();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }

  clearNotifications() {
    this.notificationService.clear();
    this.notifications = [];
  }

  // ⭐ Google Login
  ngAfterViewInit(): void {
    setTimeout(() => {
      google.accounts.id.initialize({
        client_id: "195291262437-liklumdsugn8ibpgn3jgb0kaelad8tdq.apps.googleusercontent.com",
        callback: (response: any) => this.handleLogin(response),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      const googleBtn = document.getElementById("google-btn");

      if (googleBtn) {
        google.accounts.id.renderButton(googleBtn, {
          theme: 'outline',
          size: 'medium',
          shape: 'pill',
          width: 160
        });
      }

      google.accounts.id.prompt();
    }, 300);
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {

    const payload = this.decodeToken(response.credential);

    sessionStorage.setItem("Loggedinuser", JSON.stringify(payload));

    this.isloggedIn = true;

    this.notificationService.add("✅ Login successful");
    this.notificationService.add("Welcome " + payload.name);

    this.loadNotifications();
  }

  handlelogout() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('Loggedinuser');
    this.isloggedIn = false;
    window.location.reload();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}