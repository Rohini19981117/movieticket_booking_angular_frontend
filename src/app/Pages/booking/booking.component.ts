import { SeatscontinerComponent } from './seatscontiner/seatscontiner.component';
import { order } from './../../DataTypes/order';
import { OrderService } from './../../Services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from './../../Services/booking.service';
import { seats } from './../../DataTypes/seats';
import { booking } from './../../DataTypes/booking';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  private _movieName: string;
  private bookingService:BookingService;
  private orderService: OrderService;

  bookingInput: booking=new booking();
  notSelected: boolean = true;
  canSelectSeats: boolean = false;

  @ViewChild(SeatscontinerComponent) child: SeatscontinerComponent;

  public selectedSeats: seats[] = []; // seats which current user will select

 constructor(private router: Router, bookingService:BookingService,
    private _activatedRoute: ActivatedRoute, orderService: OrderService){
  this.bookingService=bookingService;
  this.orderService = this.orderService;
 }
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe((response)=>
        {
      this._movieName = (response.get('movieName'));
    })
  }
  
  public addSeat(newSeat: seats){
    this.notSelected=false;
     this.selectedSeats.push(newSeat);
     console.log(this.selectedSeats);
  }

  public removeSeat(seatToBeRemoved: seats){

    let seatToBeDeleted: seats = this.selectedSeats.filter((element)=>{
        if(element.seatRow==seatToBeRemoved.seatRow && element.seatNumber == seatToBeRemoved.seatNumber
           && element.seatType==seatToBeRemoved.seatType)
         return element;
      })[0];
      let indexToBeDeleted: number = this.selectedSeats.indexOf(seatToBeDeleted);
      this.selectedSeats.splice(indexToBeDeleted,1);
      console.log(this.selectedSeats);

      if(this.selectedSeats.length==0){
        this.notSelected=true;
      }
      else{
        this.notSelected=false;
      }
  }
  checkAllDetailsFilled(data: NgForm){
    console.log(data.value);
    if(data.value.bookingDate!=null && data.value.bookingTime!=null && data.value.movieLanguage!=null && data.value.movieFormat!=null){
        this.bookingService.getSeatsOfParticularBooking(this._movieName, data.value.movieLanguage, data.value.bookingDate,
           data.value.bookingTime, data.value.movieFormat).subscribe(
            (response: seats[])=>{
              console.log(response);
              this.canSelectSeats = true;
              this.child.setOccupiedSeats(response);
            }
           )
    }
    else
    {
      this.canSelectSeats = false;
      console.log(this.canSelectSeats);
    }
  }
  onSubmit(data:NgForm){
    console.log(data.value);
    // this.orderService.bookingForm = this.bookingInput;
    this.bookingInput.seats = this.selectedSeats;
    this.router.navigate(['movies/'+this._movieName+'/booking/order'],{
      state:{bookingInput: this.bookingInput}
    });
  }
}
