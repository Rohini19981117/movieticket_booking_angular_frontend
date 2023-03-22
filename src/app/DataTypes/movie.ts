import { cast } from './cast';
import { review } from './review';
import { Time } from "@angular/common";

export class movies{
    public movieName: string = null;
    public movieGenre: string = null;
    public imageURL: string = null
    public duration: string = null;
    public certificate: string = null;
    public releaseDate: string = null;
    public description: string = null;
    public reviews: review[] = null;
    public cast: cast[] = null;
    constructor(){

    }
}