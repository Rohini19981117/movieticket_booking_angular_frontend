import { user } from './user';
import { discount } from './discount';
import { booking } from './booking';
export class order{
    public orderId: number = null;
    public booking: booking = null;
    public discount: discount = null;
    public user: user = null;
    public cardType: string = null;
    public bank: string = null;
    public amount: number = null;
    constructor(){

    }
}