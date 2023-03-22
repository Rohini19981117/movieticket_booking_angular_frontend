
import { DiscountService } from './../../Services/discount.service';
import { discount } from './../../DataTypes/discount';
import { Component } from '@angular/core';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent {
  public submitted:boolean;
  public discountInput: string;
  public discountDetails: discount;
  public placeholderDiscountPercentage: number = 0;

  private _service: DiscountService;
  private _allDiscountDetails: discount[];

  //
  constructor(service: DiscountService){
    this.discountDetails = new discount();
    this._service = service;
  }

  ngOnInit(){
    this._service.getDiscount().subscribe(
      (response: discount[])=>{
        this._allDiscountDetails = response;
        console.log(this._allDiscountDetails);
      }
    )
  }

  updateDiscountPlaceholder(bankNameEntered: string){
    console.log(bankNameEntered);
    let filteredData = this._allDiscountDetails.filter((discount)=> discount.bankName === bankNameEntered);
    console.log(filteredData);
    this.placeholderDiscountPercentage = filteredData[0].discountPercentage;
  }

  onSubmit(){
    this.submitted = true;
    // console.log(this.discountDetails);
    this.discountDetails.discountPercentage = parseFloat(this.discountInput);

    this._service.putDiscount(this.discountDetails).subscribe(
      (response: discount)=>{
        console.log(response);
      }
    )
  }
}
