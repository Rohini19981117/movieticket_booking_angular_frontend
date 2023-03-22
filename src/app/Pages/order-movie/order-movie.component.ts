import { OrderService } from './../../Services/order.service';
import { discount } from './../../DataTypes/discount';
import { DiscountService } from './../../Services/discount.service';
import { seats } from './../../DataTypes/seats';
import { MovieService } from './../../Services/movie.service';
import { booking } from './../../DataTypes/booking';
import { movies } from './../../DataTypes/movie';
import { order } from './../../DataTypes/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-movie',
  templateUrl: './order-movie.component.html',
  styleUrls: ['./order-movie.component.css']
})
export class OrderMovieComponent {
  private _userId: number = parseInt(localStorage.getItem('userId'));
  private _activatedRoute: ActivatedRoute;
  private _movieNameToBeFounded: string;
  private _router: Router;
  
  //declare services
  private _movieService: MovieService;
  private _discountService: DiscountService;
  private _orderService: OrderService;

  private _premiumPrice: number = 300;
  private _goldPrice: number = 200;
  private _silverPrice: number = 150;
  private _discount: discount = null;
  private _bookingDetails: any = null;

  public orderToPlaced: order;
  public movieToOrder: movies;
  public bookingMovie: booking;
  public finalAmountToPay: number = 0;
  public withoutDiscountPrice:number = 0;
  public discountAmount: number = 0;
  public premiumSeats:seats[] = new Array(0);
  public goldSeats:seats[] = new Array(0);
  public silverSeats:seats[] = new Array(0);
  public discounts:discount[] = new Array(0);

  constructor(activatedRoute: ActivatedRoute, movieService: MovieService,
    discountService: DiscountService, orderService: OrderService, router: Router){

    console.log(this._userId);

    this.orderToPlaced = new order();
    this.movieToOrder = new movies();
    this.bookingMovie = new booking();

    this._activatedRoute = activatedRoute;
    this._movieService = movieService;
    this._discountService = discountService;
    this._orderService = orderService;
    this.bookingMovie = history.state.bookingInput;
    this._router=router;

    // this._bookingDetails = history.state.data;
    // console.log(this._bookingDetails);
    // this.bookingMovie = {
    //   movie: null,
    //   language: "Hindi",
    //   movieFormat: "2D",
    //   bookingDate: "2023-01-25",
    //   bookingTime: "15:33:00",
    //   seats: [{
    //     seatNumber: 1,
    //     seatRow: "A",
    //     seatType: "Premium",
    //     seatStatus:""
    //   }, 
    //   {
    //     seatNumber: 2,
    //     seatRow: "B",
    //     seatType: "Premium",
    //     seatStatus:""
    //   }]
    // }

  }

  ngOnInit(){
    this._activatedRoute.paramMap.subscribe(
      (response)=>{
        this._movieNameToBeFounded = response.get('movieName');
      }
    )

    //get movie by name
    this._movieService.getMovieByName(this._movieNameToBeFounded).subscribe(
      (response: movies)=>{
        this.movieToOrder = response;
        // console.log(this.movieToOrder);
        // console.log(typeof this.movieToOrder.duration);

      }
    );

      console.log(this.bookingMovie);
      this.bookingMovie?.seats?.forEach(element => {
          if(element.seatType.toLowerCase() == "premium") {
            this.premiumSeats.push(element);
            this.withoutDiscountPrice += this._premiumPrice;
          }   
          else if(element.seatType.toLowerCase() == "gold"){
            this.premiumSeats.push(element);
            this.withoutDiscountPrice += this._goldPrice;
          } 
          else{
            this.premiumSeats.push(element);
            this.withoutDiscountPrice += this._silverPrice;
          }
        });


    this._discountService.getDiscount().subscribe(
      (response: discount[])=>{
        this.discounts = response;
      }
    );
  }

  onSelectDiscount(bankName: string){
    this._discount = this.getDiscountByBankName(bankName);
    this.discountAmount = ( this.withoutDiscountPrice * this._discount.discountPercentage)/100;
    this.finalAmountToPay = this.withoutDiscountPrice - this.discountAmount;
  }

  getDiscountByBankName(bankName: string){
    let discountToFind: discount = this.discounts.filter(
      (element) => element.bankName == bankName
    )[0];
    return discountToFind;
  }

  onSubmit(){

    this.orderToPlaced.booking = this.bookingMovie;
    this.orderToPlaced.amount = this.finalAmountToPay;
    console.log(this.orderToPlaced);
    this._orderService.postOrder(this.orderToPlaced, this._userId,
       this._movieNameToBeFounded).subscribe(
      (response)=>{
        console.log(response);
        this._router.navigate(['home']);
      }
    )

  }
}
