import { order } from './order';
import { contactAddress } from './contactAddress';
export class user{
    public firstName:string = null;
    public lastName:string = null;
    public gender:string = null;
    public dateOfBirth: Date = null;
    public password: String = null;
    public address:contactAddress = null;
    public orders:order[] = null;
    constructor(){

    }
}