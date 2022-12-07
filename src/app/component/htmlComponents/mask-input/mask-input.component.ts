import {  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges, } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, FormControl } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
import { InputInfo } from "../../componentModel/input-info";

@Component({
  selector: 'app-mask-input',
  templateUrl: './mask-input.component.html',
  styleUrls: ['./mask-input.component.css']
})
export class MaskInputComponent implements OnInit,OnChanges {
 
   @Input() inputInfo: InputInfo;
   
   @Input() changeFlag: boolean;

   @Input() mask:any;
 
   disabled: boolean = true;
   
   @Output() updateData = new EventEmitter<string>();
  
   @Output() preSubmit = new EventEmitter();
   
   @Output() submit = new EventEmitter();
  
   @Output() click = new EventEmitter();
 
  
   formControl = new FormControl("", []);

  //  public mask = {
  //    guide: true,
  //    showMask: true,
  //    mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
  //  };
   
  val:any;
  constructor() { }

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

    onEnter() {
      this.preSubmit.emit();
    }

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
