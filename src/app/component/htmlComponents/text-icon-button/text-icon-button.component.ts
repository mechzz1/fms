/**
 * This is our text icon button component, to be used through out our program
 */ import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-text-icon-button",
  templateUrl: "./text-icon-button.component.html",
  styleUrls: ["./text-icon-button.component.css"],
})
export class TextIconButtonComponent implements OnInit {
  /**
   * input type label of the button
   */
  @Input() label: string;
  /**
   * input background color of the button
   */
  @Input() bgColor: string;
  /**
   * input color of the button
   */
  @Input() color: string;
  /**
   * input type of the button
   */
  @Input() type: string;
  /**
   * input type icon of the button
   */
  @Input() icon: string;
  /**
   * input type iconPos of the button
   */
  @Input() iconPos: string;
  /**
   * button event emiiter
   */
  @Output() button = new EventEmitter();
  /**
   * constructor of ur component
   */
  constructor() {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * this functio emits call on button click
   */
  onClick() {
    this.button.emit();
  }
}
