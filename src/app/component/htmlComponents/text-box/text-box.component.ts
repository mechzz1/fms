/**
 * This is our text box module, to be used through out our program
 */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { UntypedFormControl, FormGroupDirective } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
import { InputInfo } from "../../componentModel/input-info";
/**
 * These are the components of our text box file
 */
@Component({
  selector: "app-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.css"],
})
export class TextBoxComponent implements OnInit, OnChanges {
  /**
   *This input function gets data from our parent class of the type input info
   */
  @Input() inputInfo: InputInfo;
  /**
   *This input function gets value change flag from our parent class of the type boolean
   */
  @Input() changeFlag: boolean;
  /**
   * disabled field boolean variable
   */
  disabled: boolean = true;
  /**
   * This output function send the updated data back to our parent class
   */
  @Output() updateData = new EventEmitter<string>();
  /**
   * This output function works for the enter button as it call out the submit function of our parent class
   */
  @Output() preSubmit = new EventEmitter();
  /**
   * submit call of the text box
   */
  @Output() submit = new EventEmitter();
  /**
   * click emiiter
   */
  @Output() click = new EventEmitter();

  /**
   * This is an object of Form Control through which we can perform function and variation to the input values taken from the user
   */
  formControl = new UntypedFormControl("", []);
  /**
   * This is the constructor of text box
   */
  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
  };
  /**
   * This is the constructor of our component
   */
  constructor() {}
  /**
   *This function checks the input in the text box for any errors and value change.
   */
  ngOnInit(): void {
    if (this.inputInfo.val) {
      this.formControl.setValue(this.inputInfo.val);
    }
    this.formControl.setValidators(
      this.inputInfo.validatorsInfo.map((item) => item.type)
    );
    this.formControl.updateValueAndValidity();
    this.formControl.valueChanges.subscribe((value) => {
      this.updateData.emit(value);
    });
  }
  /**
   * This function is used to check for error, if there is any error then it send out the error msg, if not then simply changes eroor flag to false.
   * @returns
   */
  getError() {
    var err = [];
    if (this.formControl.errors) {
      err = Object.keys(this.formControl.errors);
    }
    if (err.length > 0 && this.inputInfo.validatorsInfo.length > 0) {
      this.inputInfo.errorFlag = true;
      let val = this.inputInfo.validatorsInfo.find(
        (item) => item.type.name == err[0]
      );
      if (val) {
        return val.msg;
      } else {
        let val = this.inputInfo.validatorsInfo.find(
          (item) => item.name == err[0]
        );
        if (val) {
          return val.msg;
        }
      }
    } else {
      this.inputInfo.errorFlag = false;
    }
    return "";
  }
  /**
   * This function works for when we press enter to log in instead of using the login button and it call the submit function of the parent class.
   */
  onEnter() {
    this.preSubmit.emit();
  }
  /**
   * This function checks whether there is any change in the initial value, saves it and validates it.
   * @param changes This is a boolean type flag to check for changes in value.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.changeFlag && !changes.changeFlag.firstChange) {
      this.formControl.markAsDirty();
      this.formControl.updateValueAndValidity();
      this.submit.emit();
    }
  }
  /**
   * this functio emits call on field click
   */
  onClick() {
    this.click.emit();
  }
}
