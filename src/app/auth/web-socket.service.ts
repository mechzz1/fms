import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket : any;
  url : string ;
  constructor() { 
    // this.socket = io("http://127.0.0.1:8000/vehicle/");
  }

  listen(eventName:string , url:string){
    this.url = url;
    console.log(url);
    this.socket = io(url);
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
