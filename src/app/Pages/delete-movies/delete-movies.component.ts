import { movies } from './../../DataTypes/movie';
import { MovieService } from './../../Services/movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-movies',
  templateUrl: './delete-movies.component.html',
  styleUrls: ['./delete-movies.component.css']
})
export class DeleteMoviesComponent {

  private movieService: MovieService;

  allMovie:movies[]=[];
  movieToDelete:movies;

  constructor(movieService: MovieService){
    this.movieService=movieService;
    this.movieService.getMovies().subscribe(
      (result: movies[])=>{
      this.allMovie=result;
      console.log(this,this.allMovie)
      }
    );
  }

public Ondelete(movieToBeDeleted: movies)
{
  this.movieService.deleteMovie(movieToBeDeleted.movieName).subscribe(
    (response)=>{
      alert("Sure! Are you want to delete");
      console.log(response);
      console.log(this.allMovie);
      let movieIndexToBeDeleted:number = this.allMovie.indexOf(movieToBeDeleted);
      console.log(movieIndexToBeDeleted);
      if(movieIndexToBeDeleted != -1)
        this.allMovie.splice(movieIndexToBeDeleted,1);
    },
    (error)=>{
      console.log(error);
    }
  )
}
}