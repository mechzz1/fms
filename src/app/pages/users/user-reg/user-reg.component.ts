import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { InputInfo } from 'src/app/component/componentModel/input-info';
import { userInfo } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {
  changeFlag = false;
  counterInputs = 0;
  @Output() closeModal = new EventEmitter();
  inputInfo : InputInfo[]= [];
  userTypes = [
    {name: 'Employee', code: '2'}, 
];

  public userInfo = new userInfo();

  constructor(
    private messageService: MessageService,
    private tokenStorage: TokenStorageService, // private message: NzMessageService
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private Jarwis: AuthService,

  ) { }

  ngOnInit(): void {
    this.generateFormData();
    this.updateData("2","user_type" );
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
      "",
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
      "",
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
      "",
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
      "",
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
    this.createInput(
      "emailAddress",
      "email",
      "email",
      "Enter your email",
      "text2",
      "",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Email Address",
        },
        {
          type: Validators.email,
          msg: "You must enter valid Email Address",
        },
      ]
    );
    this.createInput(
      "password",
      "password",
      "password",
      "Enter your password",
      "text2",
      "",
      "",
      "",
      "",
      [
        {
          type: Validators.required,
          msg: "You must enter your Password",
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
    // console.log(this.userInfo);
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
      this.addMessages("success", "Success", data.message);
      this.closeModal.emit("hey");
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
