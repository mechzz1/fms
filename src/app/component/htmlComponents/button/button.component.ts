/**
 * This is our button component, to be used through out our program
 */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
/**
 * This is our component file of button component
 */
@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  /**
   * This is an input from the parent class containig a label for our button
   */
  @Input() label: string;
  /**
   * This is an input from the parent class containig a background color for our button
   */
  @Input() bgColor: string;
  /**
   * This is an input from the parent class containig color for our button
   */
  @Input() color: string;
  /**
   * This is an input from the parent class containig type for our button
   */
  @Input() type: string;
  /**
   * This is an input from the parent class containig icon for our button
   */
  @Input() icon: string;
  /**
   * This is an input from the parent class containig ocon position for our button
   */
  @Input() iconPos: string;
  /**
   * This is an input from the parent class containig font size for our button
   */

  @Input() fontSize: string;
  /**
   * This is an input from the parent class containig font weight for our button
   */
  @Input() fontWeight: string;
  /**
   * This is an input from the parent class containig btn type for our button
   */
  @Input() btn: string;
  /**
   * This is an input from the parent class containig position for our button
   */
  @Input() position: string;
  /**
   * This is an input from the parent class containig border radius for our button
   */
  @Input() borderRadius: string;
  /**
   * This is an input from the parent class containig padding for our button
   */
  @Input() padding: string;
  /**
   * This is an input from the parent class containig margin for our button
   */
  @Input() margin: string;
  /**
   * This is an input from the parent class containig box shadow for our button
   */
  @Input() boxShadow: string;
  /**
   * This is an input from the parent class containig background image for our button
   */
  @Input() backgroundImage: string;
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
