import { review } from './../../DataTypes/review';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from './../../Services/review.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review-comment',
  templateUrl: './review-comment.component.html',
  styleUrls: ['./review-comment.component.css']
})
export class ReviewCommentComponent {
  
  private _reviewService: ReviewService;
  private _userId: number = parseInt(localStorage.getItem('userId'));
  private movieName: string;

  public reviewComment: string = "";
  public oldComment: string = "";
  constructor(private route: ActivatedRoute, reviewService: ReviewService){
    this._reviewService = reviewService;
    this.route.paramMap.subscribe((response)=>
      {
    this.movieName = (response.get('movieName'));
  });

  this._reviewService.findReviewByUserAndMovieName(this._userId,this.movieName).subscribe(
    (response: review|null)=>{
        if(response!=null){
          this.oldComment = response.comment;
        }
    }
  );

  }

  public onSubmit(){
    this._reviewService.postOrUpdateReviewComment(this.reviewComment, this._userId, this.movieName).subscribe(
      (response)=>{
        console.log(response);
      }
    )
  }
}
