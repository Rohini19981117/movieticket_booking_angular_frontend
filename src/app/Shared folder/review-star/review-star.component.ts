import { review } from './../../DataTypes/review';
import { movies } from './../../DataTypes/movie';
import { ActivatedRoute } from '@angular/router';
import { star } from './../../DataTypes/star';
import { ReviewService } from './../../Services/review.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review-star',
  templateUrl: './review-star.component.html',
  styleUrls: ['./review-star.component.css']
})
export class ReviewStarComponent {
    private _reviewService: ReviewService;
    private _userId: number = parseInt(localStorage.getItem('userId'));
    private movieName: string;
    
    public stars:star[] = []
    constructor(private route :ActivatedRoute, reviewService: ReviewService){

      this._reviewService = reviewService;
      this.route.paramMap.subscribe((response)=>
        {
      this.movieName = (response.get('movieName'));
    })
      this.stars = [
        new star(),
        new star(),
        new star(),
        new star(),
        new star()
    ]
    }

    ngOnInit(){
      console.log(this._userId + " " + this.movieName);
      this._reviewService.findReviewByUserAndMovieName(this._userId,this.movieName).subscribe(
        (response:review|null)=>{
          if(response != null){
            this.giveStars(this.stars[response.stars-1]);
          }
        }
      );
    }

    private giveStars(star:star){
      let index: number = this.stars.indexOf(star);
      for(let i=0; i<=index; i++)
      {
        this.stars[i].selected=true;
      }
    }

    private removeStars(star:star){
      let index: number = this.stars.indexOf(star);
      for(let i=index+1; i<this.stars.length; i++)
      {
        this.stars[i].selected=false;
      }
    }
    
    giveReview(star:star){
      if(star.selected == true){
        this.removeStars(star);
      }
      else{
        this.giveStars(star);
      }
      console.log(star);
    }

    postOrUpdateReviewStar(starNumber: number, star: star){
      // if(star.selected != true)
        starNumber+=1;
      
      console.log("stars number: " + starNumber);
      this._reviewService.postOrUpdateReviewStar(starNumber, this._userId, this.movieName).subscribe(
        (response)=>{
          console.log(response);
        }
      );
    }
}
