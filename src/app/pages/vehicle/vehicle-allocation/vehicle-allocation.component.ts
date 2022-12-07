import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { TableInfo } from 'src/app/component/componentModel/table-info';
import { userInfo } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-vehicle-allocation',
  templateUrl: './vehicle-allocation.component.html',
  styleUrls: ['./vehicle-allocation.component.css']
})
export class VehicleAllocationComponent implements OnInit {
  tableHeaders = [
    {
      field: "employeeId",
      header: "Employee ID",
      type: "text",
      edit: "false",
    },
    {
      field: "email",
      header: "Email",
      type: "text",
      edit: "false",
    },
    {
      field: "name",
      header: "Name",
      type: "text",
      edit: "false",
    },
    {
      field: "vehicleRegNo",
      header: "Vehicle Reg Number",
      type: "text",
      edit: "false",
    },
    {
      field: "vehicleId",
      header: "Vehicle ID",
      type: "text",
      edit: "false",
    },

    {
      field: "actions",
      header: "Actions",
      type: "editButton",
      edit: "true",
    },
  ];
  tableInfo: TableInfo[] = [];
  display: boolean = false;
  public userInfo = new userInfo();

  employee : any[] = [];
  constructor(
    private messageService: MessageService,
    private Jarwis: AuthService,

  ) { }

  ngOnInit(): void {
    this.getAllAssignedVehicle();

  }
 
  getAllAssignedVehicle(){
    this.Jarwis.getAllAssignedVehicle().subscribe(
      (data) => this.handleAssignedVehicleData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  handleAssignedVehicleData(data,type){
    console.log(data);
    if(data.error){
      this.handleError(data);
    }else{
      console.log(data);
      this.tableInfo = [];
      data.data.forEach((item) => {
      let obj = new TableInfo();
      obj.vehicle_number = item.vehicle_number;
      obj.vehicle_name = item.vehicle_name;
      obj.vehicle_company= item.vehicle_company;
      obj.vehicle_model= item.vehicle_model;
      obj.email = item.email;
      obj.id = item.id;
      obj.contact = item.contact;
      obj.cnic = item.cnic;


      obj.userType = "Employee";
      this.tableInfo.push(obj);
    });
    }
  }
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  openAndClodeModal(event , value){
    this.display = false;
    this.getAllAssignedVehicle();

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
  addUser(){
    this.display = true;
  }
}
