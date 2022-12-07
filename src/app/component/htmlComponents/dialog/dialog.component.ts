/**
 * This is our dialog component, to be used through out our program
 */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { InputInfo } from "../../componentModel/input-info";
/**
 * This is our component file of link-button component
 */
@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  /**
   *This input function gets data from our parent class of the type input info
   */
  @Input() inputInfo = new InputInfo();
  /**
   *type of the dialog
   */
  @Input() type: string;
  /**
   *call to open dialog
   */
  @Input() openDialog: boolean;
  /**
   *call to close
   */
  @Output() close = new EventEmitter();
  /**
   * emiiter when data is updated
   */
  @Output() updateData = new EventEmitter<string>();
  /**
   * name of the template
   */
  templateName: string;
  /**
   *
   * @param messageService display messages throught our application
   */
  constructor(private messageService: MessageService) {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * closes modal and emits close
   */
  closeModal() {
    this.openDialog = false;
    this.close.emit();
  }
  /**
   * saves template name
   * @param data template name
   */
  saveData(data, label) {
    this.templateName = data;
  }
  /**
   * when submit is called update data emits
   * @returns
   */
  onSubmit() {
    if (!this.templateName) {
      this.addMessages("error", "Error", "Template name cannot be empty");
      return;
    }
    this.updateData.emit(this.templateName);
  }
  /**
   * this is our function to call the message service to display our required message
   * @param severity defines the type/severity of the message to be displayed
   * @param summary defines the summary of the message
   * @param detail contains the string of the message to be displayed
   */
  addMessages(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: true,
    });
    setTimeout(() => {
      this.messageService.clear();
    }, 3000);
  }
}
