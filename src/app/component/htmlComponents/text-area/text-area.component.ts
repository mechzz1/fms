/**
 * This is our text area component, to be used through out our program
 */
import {
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
import { AbstractControl, UntypedFormControl, ValidatorFn } from "@angular/forms";
import { CustomValidatorsInfo } from "../../componentModel/customValidator-info";
import { InputInfo } from "../../componentModel/input-info";
/**
 * These are the components of our text area file
 */
@Component({
  selector: "app-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.css"],
})
export class TextAreaComponent
  implements OnInit, OnChanges, AfterContentChecked
{
  /**
   *This input function gets data from our parent class of the type input info
   */
  @Input() inputInfo: InputInfo;
  /**
   *This input function gets value change flag from our parent class of the type boolean
   */
  @Input() changeFlag: boolean;
  /**
   * fields to be inserted in text area
   */
  @Input() insertField: InputInfo;
  /**
   * adding inserted fields
   */
  @Input() insertingAdd: string;
  /**
   * removing addition
   */
  @Input() removingAdd: string;
  /**
   * value of the length of the message body
   */
  @Input() value: number;
  // value: number = 50;
  /**
   * updated Data flag
   */
  @Input() updatedFlag: boolean;
  /**
   * custom error validation
   */
  @Input() customValidator: CustomValidatorsInfo;
  /**
   * emiiter when data is updated
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
   * forcontrol for our text area for model binding
   */
  formControl = new UntypedFormControl("", []);
  /**
   *
   * @param changeDetector detect any change
   */
  constructor(private changeDetector: ChangeDetectorRef) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.formControl.setValue(this.inputInfo.messageBody);
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
   * This function checks whether there is any change in the initial value, saves it and validates it.
   * @param changes This is a boolean type flag to check for changes in value.
   */
  ngOnChanges(changes: SimpleChanges) {
    // if (this.insertField.flag == true) {
    //   var data =
    //     this.insertField.messageBody + "{" + this.insertField.field + "}";
    //   this.formControl.setValue(data);
    // }
    if (this.inputInfo.flag == true) {
      // var data =
      //   this.insertField.messageBody + "{" + this.insertField.field + "}";
      this.formControl.setValue(this.inputInfo.messageBody);
    }

    this.inputInfo.flag = false;
    setTimeout(() => {
      if (changes.changeFlag && !changes.changeFlag.firstChange) {
        this.formControl.markAsDirty();
        this.formControl.updateValueAndValidity();
        this.submit.emit();
        // if (!this.change) {
        //   this.submit.emit();
        //   this.change = true;
        // }
      }
      if (changes.updatedFlag && !changes.updatedFlag.firstChange) {
        this.formControl.markAsDirty();
        this.formControl.updateValueAndValidity();
        this.formControl.setValue(this.inputInfo.val);
      }
    });
  }
  /**
   * after content is changes this function check it
   */
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
