import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ReviewService } from '../../service/review.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  fromoption: string = '';
  tooption: string = '';
  selectedDate: Date | null = null;

  reviews: any[] = [];

  newRating: number = 5;
  newComment: string = '';

  averageRating: number = 0;
  totalReviews: number = 0;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  // ✅ Load reviews
  loadReviews() {
    this.reviewService.getReviews().subscribe((data: any[]) => {

      this.reviews = data.reverse();
      this.totalReviews = this.reviews.length;

      if (this.totalReviews > 0) {
        const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
        this.averageRating = total / this.totalReviews;
      } else {
        this.averageRating = 0;
      }

    });
  }

  fromEvent(city: string) {
    this.fromoption = city;
  }

  toEvent(city: string) {
    this.tooption = city;
  }

  submit() {
    if (this.fromoption && this.tooption && this.selectedDate) {
      this.router.navigate(['/select-bus'], {
        queryParams: {
          departure: this.fromoption,
          arrival: this.tooption,
          date: this.selectedDate
        }
      });
    } else {
      this.dialog.open(DialogComponent);
    }
  }

  // ⭐ Submit Review
  // ⭐ Submit Review
submitReview() {

  const user = sessionStorage.getItem("Loggedinuser");

  if (!user) {
    alert("Please login to submit review");
    return;
  }

  if (!this.newComment.trim()) {
    alert("Please write a review");
    return;
  }

  const userData = JSON.parse(user);

  const reviewData = {
    name: userData.name || userData.email,
    rating: this.newRating,
    comment: this.newComment
  };

  this.reviewService.addReview(reviewData)
    .subscribe(() => {

      this.newComment = '';
      this.newRating = 5;

      this.loadReviews();
    });
}
}