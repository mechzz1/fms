/**
 * This is our input table component, to be used through out our program
 */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { Validators } from "@angular/forms";
import { MessageService, SelectItem } from "primeng/api";
import { Table } from "primeng/table";
import { InputInfo } from "../../componentModel/input-info";
import { TableInfo } from "../../componentModel/table-info";
/**
 * This is our component file of link-button component
 */
@Component({
  selector: "app-input-table",
  templateUrl: "./input-table.component.html",
  styleUrls: ["./input-table.component.css"],
})
export class InputTableComponent implements OnInit, OnChanges {
  /**
   * table data of table info type
   */
  tableInfo = new TableInfo();
  /**
   *delete flag
   */
  deleteFlag = false;
  /**
   *table headers from parent
   */
  @Input() cols: any[];
  /**
   *table data from parent
   */
  @Input() col: InputInfo[][] = [];
  /**
   *TEXT AREA GENERATION FLAG
   */
  @Input() textAreaFlag: boolean;
  /**
   *cloned data variable
   */
  clonedCol: { [s: string]: any } = {};
  /**
   * parent call action perform
   */
  @Output() actionButton = new EventEmitter<TableInfo>();
  /**
   * parent call on save button
   */
  @Output() saveButton = new EventEmitter<any>();
  /**
   *This input function gets value change flag from our parent class of the type boolean
   */
  @Input() changeFlag: boolean;
  /**
   * input info required for text area
   */
  textArea: InputInfo[] = [];
  /**
   * parent call on submit button
   */
  @Output() submit = new EventEmitter();
  /**
   * parent call when data is updated
   */
  @Output() updatedData = new EventEmitter();
  /**
   * parent call when data is updated
   */
  @Output() update = new EventEmitter<{
    index: string;
    value: string;
    label: string;
  }>();
  /**
   * this is our constructor
   */
  constructor() {}
  /**
   * ngOnInIt is an angular lifecycle function that run when we load our component or application
   */
  ngOnInit(): void {}
  /**
   * This function checks whether there is any change in the initial value, saves it and validates it.
   * @param changes This is a boolean type flag to check for changes in value.
   */
  ngOnChanges(): void {}
  /**
   * cleas the table data
   * @param table table data
   */
  clear(table: Table) {
    table.clear();
  }
  /**
   *
   * @param action action to take on call
   * @param id id of the data
   */
  onClick(action, id) {
    let tableObj = new TableInfo();
    tableObj.action = action;
    tableObj.id = id;
    this.actionButton.emit(tableObj);
  }
  /**
   *
   * @param row row to edit
   */
  onRowEditInit(row) {
    this.clonedCol[row._id] = { ...row };
  }
  /**
   *
   * @param row row to save
   */
  onRowEditSave(row) {
    delete this.clonedCol[row._id];
    this.saveButton.emit(row);
  }
  /**
   *
   * @param row row to cancel
   * @param index index of the row
   */
  onRowEditCancel(row, index: number) {
    this.col[index] = this.clonedCol[row._id];
    delete this.clonedCol[index];
    this.col.splice(index, 1);
    this.deleteFlag = true;
    this.updatedData.emit(this.col);
  }
  /**
   *
   * @param index index of data
   * @param value value to be stored
   * @param label name to be stored
   */
  updateData(index, value, label) {
    this.update.emit({ index: index, value: value, label: label });
  }
  /**
   * emits submit value on submit
   */
  onSubmit() {
    this.submit.emit();
  }
}
