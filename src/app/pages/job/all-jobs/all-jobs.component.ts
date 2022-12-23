import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { TableInfo } from 'src/app/component/componentModel/table-info';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit {
  jobId;
  tableHeaders = [
    {
      field: "dateTime",
      header: "Date",
      type: "date",
      edit: "false",
    },
    {
      field: "driver",
      header: "Employee ID",
      type: "text",
      edit: "false",
    },
    {
      field: "job_name",
      header: "Job Name",
      type: "text",
      edit: "false",
    },
 
    {
      field: "pickup_location",
      header: "Pick-up",
      type: "text",
      edit: "false",
    },
    {
      field: "dropoff_location",
      header: "Drop-off",
      type: "text",
      edit: "false",
    },
    {
      field: "status",
      header: "status",
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

  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(){
    this.Jarwis.getAllJobs().subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  openAndClodeModal(event , value){

  }
  assignJob(){
    this.display = true;
  }
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleData(data, type) {
    console.log(data);
    if(data.error){
      this.handleError(data);
    }else{
      console.log(data.data.createdAt);
      this.tableInfo = [];
      data.data.forEach((item) => {
      let obj = new TableInfo();
      obj.driver = item.driver_id;
      obj.dateTime = item.created_at;
      obj.job_name = item.job_name;
      obj.id = item.id;
      obj.pickup_location = item.pickup_location;
      obj.dropoff_location = item.dropoff_location;
      if(item.job_status == '1'){

        obj.status = "Pending";
      }else if(item.job_status == '2'){
        obj.status = "Inprogress";

      }else{
        obj.status = "Completed";

      }

      obj.cnic = item.cnic;


      obj.userType = "Employee";
      this.tableInfo.push(obj);
    });
    }
  }
onDelete(data){
  this.Jarwis.jobDelete(data.id).subscribe(
    (data) => this.handleDeleteUserData(data, "success"),
    (error) => this.handleError(error)
  );
}
onEditUser(data){
  // console.log(data);
  this.jobId = data.id;
  this.display1 = true;
}
handleDeleteUserData(data,type){
  if(data.error){
    this.handleError(data);
  }else{
    this.addMessages("success", "Success", data.message);
    this.getAllJobs();
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
