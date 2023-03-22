import { Router, Routes } from '@angular/router';
import { review } from './../../DataTypes/review';
import { MovieService } from './../../Services/movie.service';
import { movies } from './../../DataTypes/movie';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  private _movieService: MovieService;
  private _router: Router;

  public actionMovies: movies[] = null;
  public adventureMovies: movies[] = null;
  public dramaMovies: movies[] = null;
  public romanceMovies: movies[] = null;
  public fictionMovies: movies[] = null;
  public comedyMovies: movies[] = null;
  public thrillerMovies: movies[] = null;

  public allMovies: movies[] = null;

  public movieCategoriesToDisplay: {"movies":movies[][],
                                    "category_name":string[]} = {"movies":[], "category_name":[]};

  constructor(movieService: MovieService, router: Router){
    this._router = router;
    localStorage.setItem('userId', '1');
    
    this.movieCategoriesToDisplay.category_name.push("Action Movies");
    this.movieCategoriesToDisplay.movies.push(this.actionMovies);

    this.movieCategoriesToDisplay.category_name.push("Adventure Movies");
    this.movieCategoriesToDisplay.movies.push(this.adventureMovies);

    this.movieCategoriesToDisplay.category_name.push("Drama Movies");
    this.movieCategoriesToDisplay.movies.push(this.dramaMovies);

    this.movieCategoriesToDisplay.category_name.push("Romantic Movies");
    this.movieCategoriesToDisplay.movies.push(this.romanceMovies);

    this.movieCategoriesToDisplay.category_name.push("Fiction Movies");
    this.movieCategoriesToDisplay.movies.push(this.fictionMovies);

    this.movieCategoriesToDisplay.category_name.push("Comedy Movies");
    this.movieCategoriesToDisplay.movies.push(this.comedyMovies);

    this.movieCategoriesToDisplay.category_name.push("Thriller Movies");
    this.movieCategoriesToDisplay.movies.push(this.thrillerMovies);

    this._movieService = movieService;
    this._movieService.getMovies().subscribe(
      (response: movies[])=>{
        this.allMovies = response;
        console.log(this.allMovies);
        this.movieCategoriesToDisplay.movies[0] = this.allMovies.filter((element)=>element.movieGenre=="Action");
        this.movieCategoriesToDisplay.movies[1] = this.allMovies.filter((element)=>element.movieGenre=="Adventure");
        this.movieCategoriesToDisplay.movies[2] = this.allMovies.filter((element)=>element.movieGenre=="Drama");
        this.movieCategoriesToDisplay.movies[3] = this.allMovies.filter((element)=>element.movieGenre=="Romance");
        this.movieCategoriesToDisplay.movies[4] = this.allMovies.filter((element)=>element.movieGenre=="Fiction");
        this.movieCategoriesToDisplay.movies[5] = this.allMovies.filter((element)=>element.movieGenre=="Comedy");
        this.movieCategoriesToDisplay.movies[6] = this.allMovies.filter((element)=>element.movieGenre=="Thriller");

      }
    );

    console.log(this.movieCategoriesToDisplay);
  }

  navigateToMovieDetails(movieName: string){
    this._router.navigate(['movies/'+movieName]);
  }
}
