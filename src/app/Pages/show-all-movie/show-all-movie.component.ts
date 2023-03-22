import { MovieService } from './../../Services/movie.service';

import { movies } from '../../DataTypes/movie';
import { Component } from '@angular/core';

@Component({
  selector: 'app-show-all-movie',
  templateUrl: './show-all-movie.component.html',
  styleUrls: ['./show-all-movie.component.css']
})
export class ShowAllMovieComponent {
  public filterText = "";

  public currentPage:number=0;
  public totalPages:number
  public totalMovies:movies[]=[];

  public allMovie: movies[] = [];

  constructor(private service:MovieService){
  }

  ngOnInit():void{

    this.service.getMovies().subscribe((response)=>{
      this.totalMovies = response;
      this.totalPages= Math.ceil(this.totalMovies.length/3);
    })

    this.service.getMovieByPagination(0 , 3).subscribe((response:any)=>{
      this.allMovie = response?.content;
    })

  }

  public getMovieByGenreButtonClick(movieGenre: string, pageNumber: number){
    this.service.getMovieGenre(movieGenre,pageNumber,6).subscribe(
      (response:any)=>{
      this.allMovie = response?.content;
    })
  }

  public getMovieByPaginationButtonClick(pageSize: number , buttonType:string){
    let pageNumber= this.currentPage;
     if(pageNumber== this.totalPages-1 && buttonType=='next'){

      pageNumber=0;

    }else if(pageNumber==0 && buttonType=='previous') {
      pageNumber=this.totalPages-1;
    }
    else if (buttonType=='next'){
      pageNumber+= 1
    }
    else if(buttonType== 'previous'){
      pageNumber-=1;
    }
    this.currentPage=pageNumber;
    console.log(pageNumber);
    console.log(buttonType);
    console.log(pageSize);
    this.service.getMovieByPagination(pageNumber, pageSize).subscribe((response:any)=>{
      this.allMovie = response?.content;
    })
  }

}