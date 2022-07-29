import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() {
     // empty constructor
  }

  public messages:any[] = []


  private deleteMessage(){

    setTimeout(() => {

        this.messages.splice(0,1)

    }, 2000);

  }

  public load(message:string){

    this.messages.push({msg:message, type:'info'})
    this.deleteMessage()
  }


}
