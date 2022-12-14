import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket : any;
  readonly url : string = "http://127.0.0.1:8000/job/";
  constructor() { 
    this.socket = io(this.url);
  }

  listen(eventName:string){
    return new Observable((Subscriber) =>{
      this.socket.on(eventName , (data)=>{
        Subscriber.next();
      })
    });
  }
    emit(eventName : string, data : any){
      this.socket.emit(eventName , data);
    }
}
