import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { TableInfo } from 'src/app/component/componentModel/table-info';

@Component({
  selector: 'app-all-vehicle',
  templateUrl: './all-vehicle.component.html',
  styleUrls: ['./all-vehicle.component.css']
})
export class AllVehicleComponent implements OnInit {
  tableHeaders = [
    {
      field: "vehicle_number",
      header: "Registration No",
      type: "text",
      edit: "false",
    },
    {
      field: "vehicle_company",
      header: "Make",
      type: "text",
      edit: "false",
    },
    {
      field: "vehicle_model",
      header: "Model",
      type: "text",
      edit: "false",
    },
    {

      field: "chassis_no",
      header: "Chassis Number",
      type: "text",
      edit: "false",
    },
    {
      field: "milage",
      header: "Current Mileage",
      type: "text",
      edit: "false",
    },
    {
      field: "colour",
      header: "Colour",
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

  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAllVehicles();
  }
  getAllVehicles(){
    this.Jarwis.getAllVehicles().subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  openAndClodeModal(event , value){
    this.display = false;
    this.getAllVehicles();
  }
  addUser(){
    this.display = true;
  }

  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleData(data, type) {
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
      obj.chassis_no= item.chassis_no;
      obj.colour= item.colour;


      obj.milage= item.milage;

      obj.email = item.email;
      obj.id = item.id;
      obj.contact = item.contact;
      obj.cnic = item.cnic;


      obj.userType = "Employee";
      this.tableInfo.push(obj);
    });
    }
  }
onDelete(data){
  this.Jarwis.deleteVehicle(data.id).subscribe(
    (data) => this.handleDeleteUserData(data, "success"),
    (error) => this.handleError(error)
  );
}
onEditUser(data){
  // console.log(data);
  this.display = true;
}

handleDeleteUserData(data,type){
  if(data.error){
    this.handleError(data);
  }else{
    this.addMessages("success", "Success", data.message);
    this.getAllVehicles();
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
