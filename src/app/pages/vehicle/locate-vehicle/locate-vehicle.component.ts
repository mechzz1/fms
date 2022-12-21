import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { WebSocketService } from "src/app/auth/web-socket.service";
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-locate-vehicle",
  templateUrl: "./locate-vehicle.component.html",
  styleUrls: ["./locate-vehicle.component.css"],
})
export class LocateVehicleComponent implements OnInit, OnDestroy {
  vehicleId: number;
  url;
  mySub: Subscription;
  latitude : number ;
  longitude: number;
  constructor(
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private Jarwis: AuthService,
    private messageService: MessageService,
    private http: HttpClient,


  ) {
    this.mySub = interval(2000).subscribe((func => {
      this.getAllVehicles();
    }))
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.vehicleId = params.vehicleId;
    });
  }
  ngOnDestroy() {
    // ...
    this.mySub.unsubscribe()

  }
  
  getAllVehicles(){
    this.Jarwis.getAllVehicles().subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      this.latitude = data.data[0].vehicle_last_location.latitude ;
      this.longitude = data.data[0].vehicle_last_location.longitude ;
  }
}
addMessages(severity, summary, detail) {
  this.messageService.clear();
  this.messageService.add({
    severity: severity,
    summary: summary,
    detail: detail,
    sticky: true,
  });
  setTimeout(() => {
    this.messageService.clear();
  }, 3000);
}
}
