import { order } from './../../DataTypes/order';
import { OrderService } from './../../Services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  private _orderService: OrderService;

  public allOrders: order[] = null;
  
  constructor(orderService: OrderService){
    this._orderService = orderService;
  }

  ngOnInit(){
    this._orderService.getAllOrders().subscribe(
      (response:order[])=>{
          this.allOrders = response;
          console.log(this.allOrders);
      }
    )
  }


}
