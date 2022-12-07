/**
 * This is our side panel component, to be used through out our program
 */
import {
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
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-radio-button",
  templateUrl: "./radio-button.component.html",
  styleUrls: ["./radio-button.component.css"],
})
export class RadioButtonComponent implements OnInit, OnChanges {
  /**
   * This is an input from the parent class containig a label for our button
   */
  @Input() label: string;
  /**
   *This input function gets data from our parent class of the type input info
   */
  @Input() inputInfo: InputInfo;
  /**
   *This input function gets value change flag from our parent class of the type boolean
   */
  @Input() changeFlag: boolean;
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
   * action after button select
   */
  @Output() action = new EventEmitter();
  /**
   * city name string
   */
  city: string;
  /**
   * forcontrol for our radio buttons for model binding
   */
  formControl = new UntypedFormControl("", []);
  /**
   * slected category
   */
  selectedCategory: any = null;
  /**
   * This is the constructor of our component
   */
  constructor() {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {
    this.formControl.setValue(this.inputInfo.val);
    this.formControl.setValidators(
      this.inputInfo.validatorsInfo.map((item) => item.type)
    );
    this.formControl.updateValueAndValidity();
    this.formControl.valueChanges.subscribe((value) => {
      this.updateData.emit(value.value);
    });
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
        // if (!this.change) {
        //   this.submit.emit();
        //   this.change = true;
        // }
      }
    });
  }
  /**
   * This function works for when we press enter to log in instead of using the login button and it call the submit function of the parent class.
   */
  onEnter() {
    this.preSubmit.emit();
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
   * this functio emits call on field click
   */
  click() {
    this.action.emit();
  }
}
