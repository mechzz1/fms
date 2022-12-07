import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { InputInfo } from 'src/app/component/componentModel/input-info';
import { JobInfo } from 'src/app/models/jobInfo.model';
import { AllJobsComponent } from '../all-jobs/all-jobs.component';



@Component({
  selector: 'app-assign-job',
  templateUrl: './assign-job.component.html',
  styleUrls: ['./assign-job.component.css']
})

export class AssignJobComponent implements OnInit {


  changeFlag = false;
  counterInputs = 0;
  inputInfo : InputInfo[]= [];
  employee : any[] = [];
  public jobInfo = new JobInfo();

    constructor(
      private messageService: MessageService,
    private Jarwis: AuthService,
    private router: Router,
 
  ) { }
 
 
  ngOnInit() {
    this.getAllEmployee();

    this.generateFormData();
  }

  getAllEmployee(){
    this.Jarwis.getAllEmployee().subscribe(
      (data) => this.handleEmployeeData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  generateFormData(){
    this.inputInfo = [];
    this.createInput(
      "employee name",
      "driver",
      "text",
      "Employee Name",
      "drop",
      "",
      "",
      this.employee,
      [
        {
          type: Validators.required,
          msg: "You must select your Employee Name",
        },
      ]
    );
    this.createInput(
      "job name",
      "job_name",
      "text",
      "Jon Name",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must select your Job Name",
        },
      ]
    );
    this.createInput(
      "pick up",
      "pickup_location",
      "text",
      "Pick-up",
      "map",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must select your Pick-up",
        },
      ]
    );
    this.createInput(
      "drowp off",
      "dropoff_location",
      "text",
      "Drop-off",
      "map",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must select your Drop-off",
        },
      ]
    );
   
  
  }
  createInput(
    label,
    modelName,
    inputType,
    placeHolder,
    type,
    value,
    options,
    data,
    validatorsInfo
  ) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.modelName = modelName;
    inputObj.inputType = inputType;
    inputObj.placeHolder = placeHolder;
    inputObj.type = type;
    inputObj.value = value;
    inputObj.option = options;
    inputObj.data = data;

    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  preSubmit() {
    this.counterInputs = 0;
    this.changeFlag = !this.changeFlag;
  }
  onSubmit() {
    this.counterInputs++;
    if (this.counterInputs < this.inputInfo.length) {

      return;
    }

    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    this.messageService.clear();
    this.addMessages("info", "Info", "Please Wait...");
    if (errorFlag) {
      return;
    }
    this.Jarwis.assignJob(this.jobInfo).subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
 

  }
  handleEmployeeData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      for(let item of data.data){
        this.employee.push({name:item.first_name , id:item.id});
      }
    }
    this.generateFormData();
  }
  updateData(value, label) {
    if(label == 'driver'){
      this.jobInfo[label] = value.id;
    }else{

      if(label == 'dropoff_location'){
        let temp = JSON.parse(value);
        this.jobInfo['dropoff_location'] = temp.address;
        this.jobInfo['dropoff_location_coordinates'] = { "latitude" : temp.latitude , "longitude": temp.longitude };
      }
      
      else if(label == 'pickup_location'){
        let temp = JSON.parse(value);
        this.jobInfo['pickup_location'] = temp.address;
        this.jobInfo['pickup_location_coordinates'] = { "latitude" : temp.latitude , "longitude": temp.longitude };
      }else {
      this.jobInfo[label] = value;
        
      }

    }
  }
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      this.addMessages("success", "Success", data.message);
      this.generateFormData();
      this.router.navigateByUrl("/admin/job");
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
