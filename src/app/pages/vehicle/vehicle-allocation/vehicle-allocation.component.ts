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
      field: "employee_id",
      header: "Employee ID",
      type: "text",
      edit: "false",
    },
    {
      field: "employee_email",
      header: "Email",
      type: "text",
      edit: "false",
    },
    {
      field: "employee_name",
      header: "Name",
      type: "text",
      edit: "false",
    },
    {
      field: "vehicle_number",
      header: "Vehicle Reg Number",
      type: "text",
      edit: "false",
    },
    {
      field: "vehicle_name",
      header: "Vehicle Name",
      type: "text",
      edit: "false",
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
      obj.employee_id = item.empolyee_id;
      obj.employee_name = item.employee_name;
      obj.employee_email = item.emoloyee_email;
      obj.vehicle_number = item.vehicle_number;
      obj.vehicle_name = item.vehicle_name;
      obj.vehicle_company= item.vehicle_company;
      obj.vehicle_model= item.vehicle_model;
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
