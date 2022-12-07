import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { InputInfo } from 'src/app/component/componentModel/input-info';
import { userInfo } from 'src/app/models/userInfo.model';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() employeeId;
  inputInfo : InputInfo[]= [];
  changeFlag = false;
  counterInputs = 0;
  public userInfo = new userInfo();



  constructor(
    private Jarwis: AuthService,
    private messageService: MessageService,


  ) { }

  ngOnInit(): void {
    this.getEmployeeData();
    console.log(this.employeeId);
    // this.generateFormData();
  }
getEmployeeData(){
  this.Jarwis.getOneEmployee(this.employeeId).subscribe(
    (data) => this.handleData(data, "success"),
    (error) => this.handleError(error)
  );
}
generateFormData(){
  this.inputInfo = [];
  this.createInput(
    "First Name",
    "first_name",
    "text",
    "Name",
    "text2",
    "",
    "",
    "",
    this.userInfo.first_name,
    [
      {
        type: Validators.required,
        msg: "You must enter your First Name",
      },
     
    ]
  );
  this.createInput(
    "Last name",
    "last_name",
    "text",
    "Last Name",
    "text2",
    "",
    "",
    "",
    this.userInfo.last_name,
    
    [
      {
        type: Validators.required,
        msg: "You must enter your Last Name",
      },
     
    ]
  );
  this.createInput(
    "contact no",
    "contact",
    "number",
    "Contect No",
    "text2",
    "",
    "",
    "",
    this.userInfo.contact,
    
    [
      {
        type: Validators.required,
        msg: "You must enter your Contact No",
      },
     
    ]
  );
  // this.createInput(
  //   "alternate no",
  //   "alternateNo",
  //   "number",
  //   "Alternate No",
  //   "text2",
  //   "",
  //   "",
  //   "",
  //   [
  //     {
  //       type: Validators.required,
  //       msg: "You must enter your Alternate No",
  //     },
     
  //   ]
  // );
 
  this.createInput(
    "CNIC No",
    "cnic",
    "text",
    "CNIC No",
    "mask",
    "",
    "",
    "",
    this.userInfo.cnic,
    [
      {
        type: Validators.required,
        msg: "You must enter your CNIC No",
      },
     
    ]
  );
  this.createInput(
    "user type",
    "user_type",
    "text",
    "User Type",
    "disabled",
    "",
    "",
    "",
    "Employee",
    [
      {
        type: Validators.required,
        msg: "You must enter your User Type",
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
  val,
  validatorsInfo
) {
  let inputObj = new InputInfo();
  inputObj.label = label;
  inputObj.modelName = modelName;
  inputObj.inputType = inputType;
  inputObj.placeHolder = placeHolder;
  inputObj.type = type;
  inputObj.val = val;
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
  this.Jarwis.addUser(this.userInfo).subscribe(
    (data) => this.handleData(data, "success"),
    (error) => this.handleError(error)
  );


}
updateData(value, label) {
  console.log(this.userInfo);
    if(label == 'user_type'){
    this.userInfo[label] = 2;
    }else{
      this.userInfo[label] = value;
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
    console.log(data);
    
    this.addMessages("success", "Success", data.message);
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
