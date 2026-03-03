import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 private apiUrl = "https://redbus-clone1.onrender.com/review";

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addReview(reviewData: any): Observable<any> {
    return this.http.post(this.apiUrl, reviewData);
    
  }
}