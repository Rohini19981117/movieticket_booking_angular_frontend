import { movies } from './movie';
import { seats } from './seats';

export class booking{
    public movie: movies =null;
    public bookingTime: string = null;
    public bookingDate: string = null;
    public movieFormat: string = null;
    public seats: seats[] = new Array();
    public language: string = null;
    constructor(){

    }
}