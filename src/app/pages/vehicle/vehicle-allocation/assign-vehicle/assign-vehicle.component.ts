import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { InputInfo } from 'src/app/component/componentModel/input-info';
import { VehicleAllocationInfo } from 'src/app/models/vehicleAllocation.model';

@Component({
  selector: 'app-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.css']
})
export class AssignVehicleComponent implements OnInit {
  changeFlag = false;
  counterInputs = 0;
  inputInfo : InputInfo[]= [];
  vehicle = [];
  employee : any[] = [];
  @Output() closeModal = new EventEmitter();




  public vehicleAssignInfo = new VehicleAllocationInfo();

  constructor(
    private messageService: MessageService,
    private Jarwis: AuthService,

  ) { }

  ngOnInit(): void {
    this.generateFormData();

    this.getAllEmployee();
    this.getAllVehicles();
  }
  generateFormData(){
    this.inputInfo = [];
    this.createInput(
      "employee name",
      "employee",
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
      "Vehicle",
      "vehicle",
      "text",
      "Vehicle",
      "drop",
      "",
      "",
      this.vehicle,
      [
        {
          type: Validators.required,
          msg: "You must select your Vehicle",
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
    this.Jarwis.vehicleAssign(this.vehicleAssignInfo).subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
 

  }
  handleData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      this.addMessages("success", "Success", data.message);
      this.closeModal.emit();
    }
  }


  updateData(value, label) {
    this.vehicleAssignInfo[label] = value.id;
  }
  getAllEmployee(){
    this.Jarwis.getAllEmployee().subscribe(
      (data) => this.handleEmployeeData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  getAllVehicles(){
    this.Jarwis.getAllVehicles().subscribe(
      (data) => this.handleVehicleData(data, "success"),
      (error) => this.handleError(error)
    );
  }
 
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleEmployeeData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      for(let item of data.data){
        this.employee.push({name:item.first_name , id:item.id});
      }
    }
  }
  handleVehicleData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      for(let item of data.data){
        this.vehicle.push({name:item.vehicle_number , id:item.id});
      }
    }
    this.generateFormData();
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
