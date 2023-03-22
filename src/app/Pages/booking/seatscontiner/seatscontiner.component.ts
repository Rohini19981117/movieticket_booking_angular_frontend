import { seats } from './../../../DataTypes/seats';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-seatscontiner',
  templateUrl: './seatscontiner.component.html',
  styleUrls: ['./seatscontiner.component.css']
})
export class SeatscontinerComponent {

  @Output() addSeatEvent = new EventEmitter<seats>();
  @Output() removeSeatEvent = new EventEmitter<seats>();

  public theaterSeats: seats[][];
  public seatColor:string;
  public rowTypeMap = new Map<number, string>();

  public myRows: string[] = ["A","B","C","D","E","F","G","H","I"];

  constructor(){
    this.theaterSeats = [];
    for(let i=0; i<9; i++){
      this.theaterSeats[i] = [];
      for(let j=0; j<10; j++){
          this.theaterSeats[i][j] = new seats();
      }
    }

    this.rowTypeMap.set(0, "Premium");
    this.rowTypeMap.set(2, "Gold");
    this.rowTypeMap.set(6,"Silver");

  }
  
  setOccupiedSeats(seatsToMakeOccupied: seats[]){
    seatsToMakeOccupied.forEach(
      (element)=>{
        let row = element.seatRow.charCodeAt(0) - 65;
        this.theaterSeats[row][element.seatNumber-1].seatStatus = "occupied";
      }
    )
  }

  private getSeatType(row: number, col: number):string{
    if(row==0 || row==1){
      return "Premium";
    }
    else if(row>=2 && row<=5){
      return "Gold";
    }
    else{
      return "Silver";
    }
  }

  private createSeatObject(row:number, col: number){
    this.addSeatEvent.emit({ seatNumber:col+1,
      seatRow:String.fromCharCode(65+row),
      seatType:this.getSeatType(row, col),
      seatStatus:""
    })
  }
  private deleteSeatObject(row:number, col: number){
    this.removeSeatEvent.emit({ seatNumber: col,
      seatRow:String.fromCharCode(65+row),
      seatType: this.getSeatType(row, col),
      seatStatus:""
    })
  }

  private applyInformationOfSeats(row:number, col: number, seatStatus: string){
    this.theaterSeats[row][col].seatNumber = col+1;
    this.theaterSeats[row][col].seatRow = String.fromCharCode(65+row);
    this.theaterSeats[row][col].seatStatus = seatStatus;
    this.theaterSeats[row][col].seatType = this.getSeatType(row, col);
  }

  choseSeat(row, col){
      if(this.theaterSeats[row][col].seatStatus=="Available"){
        this.applyInformationOfSeats(row, col, 'booked');
        this.createSeatObject(row, col);
      }
      else{
        this.applyInformationOfSeats(row, col, 'Available');
        this.deleteSeatObject(row, col);
      }
  }
      
 
}
  
  
 






