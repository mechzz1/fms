import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TableInfo } from 'src/app/component/componentModel/table-info';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  employeeId;
  
  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,


  ) { }
  tableHeaders = [
    {
      field: "name",
      header: "Name",
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
      field: "contact",
      header: "Contact Number",
      type: "text",
      edit: "false",
    },
    {
      field: "cnic",
      header: "Cnic No",
      type: "text",
      edit: "false",
    },
    {
      field: "userType",
      header: "userType",
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
  display1: boolean = false;


  ngOnInit(): void {
    this.getAllEmployee();
  }

  openAndClodeModal(event , value){
    this.display = false;
    this.getAllEmployee();
  }

  addUser(){
    this.display = true;
  }

  getAllEmployee(){
    this.Jarwis.getAllEmployee().subscribe(
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
      this.tableInfo = [];
      data.data.forEach((item) => {
      if(item.first_name){
        let obj = new TableInfo();
        obj.name = item.first_name + " " + item.last_name;
        obj.email = item.email;
        obj.id = item.id;
        obj.contact = item.contact;
        obj.cnic = item.cnic;
        obj.userType = "Employee";
        this.tableInfo.push(obj);
      }
   
    });
    }
  }
onDelete(data){
  this.Jarwis.userDelete(data.id).subscribe(
    (data) => this.handleDeleteUserData(data, "success"),
    (error) => this.handleError(error)
  );
}
onEditUser(data){
  // console.log(data);
  this.employeeId = data.id;
  this.display1 = true;
}
handleDeleteUserData(data,type){
  if(data.error){
    this.handleError(data);
  }else{
    this.addMessages("success", "Success", data.message);
    this.getAllEmployee();
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
