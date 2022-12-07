/**
 * This is our split button component, to be used through out our program
 */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-split-button",
  templateUrl: "./split-button.component.html",
  styleUrls: ["./split-button.component.css"],
})
export class SplitButtonComponent implements OnInit {
  /**
   * any type array from parent
   */
  @Input() items: any[];
  /**
   * This is an input from the parent class containig a label for our button
   */
  @Input() label: string;
  /**
   * This is an input from the parent class containig background color for our button
   */
  @Input() bgColor: string;
  /**
   * This is an input from the parent class containig color for our button
   */
  @Input() color: string;
  /**
   * This is an input from the parent class containig icon for our button
   */
  @Input() icon: string;

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
  ngOnInit(): void {}
  /**
   *This function is called when the button is clicked.
   */
  onClick() {
    this.button.emit();
  }
}
