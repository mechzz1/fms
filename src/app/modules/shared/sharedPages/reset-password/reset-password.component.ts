import { Component, OnInit } from "@angular/core";
import { InputInfo } from "src/app/component/componentModel/input-info";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { LoginInfo } from "src/app/models/login-info";
import { MessageService } from "primeng/api";
/**
 * This is the component class of our component
 */
@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  /**
   * This is an initialization of an empty array of the type InputInfo
   */
  inputInfo: InputInfo[] = [];
  /**
   * This is a flag to check whether the data coming from the child class has any error or not.
   */
  changeFlag = false;
  /**
   * This is the initializationof a public object of the model LoginInfo
   */
  loginInfo = new LoginInfo();

  /**
   * This is the constructor of our component
   * @param route it is the parameter of activated route that is being used
   * @param Jarwis it is a parameter of our auth service
   * @param messageService it is a parameter of our message service
   * @param router it is parameter of our roter that is used to navigate in between our angular components
   */
  constructor(
    private route: ActivatedRoute,
    private Jarwis: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.loginInfo.token = params["token"];
      if (!this.loginInfo.token) {
        this.router.navigateByUrl("/login");
      }
    });
  }
  /**
   * This is our life cycle hook that runs when our component loads
   */
  ngOnInit(): void {
    this.generateFormData();
  }
  /**
   * This is our function that takes input and saves it in our array.
   * @param label it is the label for our text boxes
   * @param inputType it is the input type of our input
   * @param type it is the type our our variable
   * @param validatorsInfo it is used to check whether the input meets our requirement
   */
  createInput(label, inputType, type, validatorsInfo) {
    let inputObj = new InputInfo();
    inputObj.label = label;
    inputObj.inputType = inputType;
    inputObj.type = type;
    inputObj.validatorsInfo = validatorsInfo;
    this.inputInfo.push(inputObj);
  }
  /**
   * This is the functions that creates input using create input function
   */
  generateFormData() {
    this.createInput("password", "password", "text", [
      {
        type: Validators.required,
        msg: "You must enter your OTP",
      },
    ]);
    this.createInput("confirmPassword", "password", "text", [
      {
        type: Validators.required,
        msg: "You must enter your OTP",
      },
    ]);
  }
  /**
   * This function updates the data if any change is made
   *
   * @param value This is the new value provided by the user
   * @param label This is the variable that passes along the value
   */
  updateData(value, label) {
    this.loginInfo[label] = value;
  }
  /**
   * This function is called when the submit/login button is pressed and this functions check whether the value is changed or not and then sends the data to the authservice
   * @returns
   */
  onSubmit() {
    this.changeFlag = !this.changeFlag;
    this.messageService.clear();
    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: "Please Wait...",
      sticky: true,
    });

    let errorFlag = this.inputInfo.find((item) => item.errorFlag == true);
    if (errorFlag) {
      return;
    }
    // this.Jarwis.resetPassword(this.loginInfo).subscribe(
    //   (data) => this.handleData(data, "success"),
    //   (error) => this.handleError(error, "error")
    // );
  }
  /**
   * This function show the message if our process is successfull and then routes us to the given url
   * @param data this is the data coming from backend
   * @param type this is the message parameter
   */
  handleData(data, type) {
    this.messageService.clear();

    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: data.message,
      sticky: true,
    });
    this.router.navigateByUrl("/login");
  }
  /**
   * This function show the message if our process is unsuccessfull and then routes us to the given url
   * @param error this is the error coming from backend
   * @param type this is the message parameter
   */
  handleError(error, type) {
    this.messageService.clear();
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: error.error.message,
      sticky: true,
    });
  }
}
