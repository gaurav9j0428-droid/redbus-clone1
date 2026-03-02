import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  departure: string = '';
  arrival: string = '';
  date: string = '';

  isloggedIn = false;
  user: any;

  notifications: string[] = [];
  showNotifications = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    // Route params
    this.route.queryParams.subscribe(params => {
      this.departure = params['departure'];
      this.arrival = params['arrival'];
      this.date = params['date'];
    });

    // Google Init
    google.accounts.id.initialize({
      client_id: "195291262437-liklumdsugn8ibpgn3jgb0kaelad8tdq.apps.googleusercontent.com",
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  }

  handleLogin(response: any) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    this.user = payload;
    this.isloggedIn = true;

    this.notifications.push("Welcome " + this.user.name);
  }

  handlelogout() {
    this.isloggedIn = false;
    this.user = null;
    google.accounts.id.disableAutoSelect();
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  clearNotifications() {
    this.notifications = [];
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}