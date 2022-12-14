import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/auth/web-socket.service';

@Component({
  selector: 'app-locate-vehicle',
  templateUrl: './locate-vehicle.component.html',
  styleUrls: ['./locate-vehicle.component.css']
})
export class LocateVehicleComponent implements OnInit {

  constructor(private webSocketService : WebSocketService) {
    this.webSocketService.listen('test event').subscribe((data)=>{
      console.log(data);
    })
    
  }

  ngOnInit(): void {
    
  }

}
