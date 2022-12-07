/**
 * This is our link button component, to be used through out our program
 */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
/**
 * This is our component file of link-button component
 */
@Component({
  selector: "app-link-button",
  templateUrl: "./link-button.component.html",
  styleUrls: ["./link-button.component.css"],
})
export class LinkButtonComponent implements OnInit {
  /**
   * This is an input from the parent class containig a label for our button
   */
  @Input() label: string;
  /**
   * This in an output from child class to parent class after the button is clicked
   */
  @Output() button = new EventEmitter();
  /**
   * This is our constructor
   */
  constructor() {}
  /**
   * This is our life cycle hook implemented by the button component class
   */
  ngOnInit(): void {}
  /**
   *This function is called when the button is clicked.
   */
  onClick() {
    this.button.emit();
  }
}
