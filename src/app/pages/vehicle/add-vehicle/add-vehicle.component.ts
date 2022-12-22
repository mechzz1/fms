import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { InputInfo } from 'src/app/component/componentModel/input-info';
import { VehicleInfo } from 'src/app/models/vehicleInfo.model';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  changeFlag = false;
  counterInputs = 0;
  inputInfo : InputInfo[]= [];
  @Output() closeModal = new EventEmitter();

  public vehicleInfo = new VehicleInfo();

  constructor(  private messageService: MessageService,
    private Jarwis: AuthService,
   ) { }

  ngOnInit(): void {
    this.generateFormData();
  }
  generateFormData(){
    this.inputInfo = [];
    this.createInput(
      "Registration No of Vehicle",
      "vehicle_number",
      "text",
      "Registration No of Vehicle",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Registration No of Vehicle",
        },
       
      ]
    );
    this.createInput(
      "vehicle name",
      "vehicle_name",
      "text",
      "Name",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Vehicle Name",
        },
       
      ]
    );
    this.createInput(
      "make",
      "vehicle_company",
      "text",
      "Make",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Make",
        },
       
      ]
    );
    this.createInput(
      "Chassis Number",
      "chassis_no",
      "number",
      "Chassis Number",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Chassis Number",
        },
       
      ]
    );
    this.createInput(
      "Model of Vehicle",
      "vehicle_model",
      "number",
      "Model of Vehicle",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Model of Vehicle",
        },
       
      ]
    );
  
    this.createInput(
      "Current Mileage",
      "milage",
      "number",
      "Current Mileage",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Current Mileage",
        },
       
      ]
    );
    this.createInput(
      "Vehicle Fuel",
      "vehicle_fuel",
      "number",
      "Vehicle Fuel in %",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Vehicle Fuel",
        },
       
      ]
    );
    this.createInput(
      "Colour",
      "colour",
      "text",
      "Colour",
      "text2",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Colour",
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
    this.Jarwis.addVehicle(this.vehicleInfo).subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
 

  }
  updateData(value, label) {
    this.vehicleInfo[label] = value;
    console.log(this.vehicleInfo);
  }
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleData(data, type) {
    if(data.error){
      this.handleError(data.error);
    }else{

      this.addMessages("success", "Success", data.message);
      this.closeModal.emit();
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
