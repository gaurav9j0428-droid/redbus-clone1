import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontend';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // load saved theme when app starts
    this.themeService.initTheme();
  }
}