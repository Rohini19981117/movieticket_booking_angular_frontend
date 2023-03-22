import { MovieService } from './../../Services/movie.service';
import { movies } from '../../DataTypes/movie';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  public singleMovie:movies; 
  public isLoaded: boolean =false;
  public movieName:string;
  

  constructor(private route :ActivatedRoute ,
    private _router:Router, private movieService :MovieService ){}

  ngOnInit():void{
    this.route.paramMap.subscribe((response)=>
        {
      this.movieName = (response.get('movieName'));
    })

    this.movieService.getMovieByName(this.movieName).subscribe(
      (response: movies)=>{
      this.singleMovie=response;
      console.log(this.singleMovie);
    })

    console.log(this.isLoaded);
    // this.isLoaded =true;
    console.log(this.isLoaded);

  }

  getBgImage(){
    console.log(this.singleMovie);
    return this.singleMovie?.imageURL;
  }
 
  bookTicketsPage(movieName: string){
    this._router.navigate(['movies/'+movieName+"/booking"]);
  }
}