/**
 * This is our check-box component, to be used through out our program
 */ import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { InputInfo } from "../../componentModel/input-info";
/**
 * This is our component file of drop down component
 */
@Component({
  selector: "app-check-box",
  templateUrl: "./check-box.component.html",
  styleUrls: ["./check-box.component.css"],
})
export class CheckBoxComponent
  implements OnInit, OnChanges, AfterContentChecked
{
  /**
   *This input function gets data from our parent class of the type input info
   */
  @Input() inputInfo: InputInfo;
  /**
   *This input function gets value change flag from our parent class of the type boolean
   */
  @Input() changeFlag;
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
   * This is an object of Form Control through which we can perform function and variation to the input values taken from the user
   */
  formControl = new UntypedFormControl("", []);
  /**
   *
   * @param cdref detect any change
   */
  constructor(private cdref: ChangeDetectorRef) {}
  /**
   *This function checks the input in the text box for any errors and value change.
   */

  ngOnInit(): void {
    if (this.inputInfo.validatorsInfo.length > 0) {
      this.formControl.setValidators(
        this.inputInfo.validatorsInfo.map((item) => item.type)
      );
      this.formControl.updateValueAndValidity();
    }

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
   * after content is changes this function check it
   */
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
  /**
   * This function checks whether there is any change in the initial value, saves it and validates it.
   * @param changes This is a boolean type flag to check for changes in value.
   */
  get runChangeDetection() {
    return true;
  }
  /**
   * This function checks whether there is any change in the initial value, saves it and validates it.
   * @param changes This is a boolean type flag to check for changes in value.
   */
  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      if (changes.changeFlag && !changes.changeFlag.firstChange) {
        this.formControl.markAsDirty();
        this.formControl.updateValueAndValidity();
        this.submit.emit();
      }
    });
  }
}
