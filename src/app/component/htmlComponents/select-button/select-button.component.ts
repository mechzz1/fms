/**
 * This is our side panel component, to be used through out our program
 */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-select-button",
  templateUrl: "./select-button.component.html",
  styleUrls: ["./select-button.component.css"],
})
export class SelectButtonComponent implements OnInit {
  /**
   * option array for select butoon
   */
  @Input() options: any[];
  /**
   * form Control for select butoon
   */
  formControl = new UntypedFormControl("", []);

  /**
   * This in an output from child class to parent class after the button is clicked
   */
  @Output() button = new EventEmitter();

  /**
   * This is our constructor
   */
  constructor() {}
  /**
   * This function is implemented by the button component class
   */
  ngOnInit(): void {
    this.formControl.setValue(this.options);
  }
  /**
   *This function is called when the button is clicked.
   */

  onClick(data) {
    let label = data.option.label;
    this.button.emit(label);
  }
}
