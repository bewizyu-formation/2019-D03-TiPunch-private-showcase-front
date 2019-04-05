import {Artist} from "./Artist";

export class User{

  constructor(
    public id:number,
    public username:string,
    public password:string,
    public mail:string,
    public city:string,
    public artists:Array<Artist>
  ){}

}
