import { seats } from './../../../DataTypes/seats';
import { OrderService } from './../../../Services/order.service';
import { order } from './../../../DataTypes/order';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-single-order-details',
  templateUrl: './single-order-details.component.html',
  styleUrls: ['./single-order-details.component.css']
})
export class SingleOrderDetailsComponent {
  private _activatedRoute: ActivatedRoute;
  private _orderService: OrderService;
  private _orderIdToDisplay: number;

  public orderToDisplay: order;
  public premiumSeats:seats[] = new Array(0);
  public goldSeats:seats[] = new Array(0);
  public silverSeats:seats[] = new Array(0);


  constructor(activatedRoute: ActivatedRoute, orderService: OrderService){
    this._activatedRoute = activatedRoute;
    this._orderService = orderService;
  }

  ngOnInit(){
    this._activatedRoute.paramMap.subscribe(
      (response)=>{
        this._orderIdToDisplay= parseInt(response.get('orderId'));
      }
    );

    this._orderService.getSingleOrder(this._orderIdToDisplay).subscribe(
      (response)=>{
        this.orderToDisplay = response;
        this.orderToDisplay.booking?.seats?.forEach(element => {
          if(element.seatType.toLowerCase() == "premium") {
            this.premiumSeats.push(element);
          }   
          else if(element.seatType.toLowerCase() == "gold"){
            this.premiumSeats.push(element);
          } 
          else{
            this.premiumSeats.push(element);
          }
        });

      }
    );

  }
}
