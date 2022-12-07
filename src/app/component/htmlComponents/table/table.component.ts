/**
 * This is our table component, to be used through out our program
 */
 import { DatePipe } from "@angular/common";
 import {
   Component,
   EventEmitter,
   Input,
   OnChanges,
   OnInit,
   Output,
   SimpleChanges,
   ViewChild,
 } from "@angular/core";
 import { Validators } from "@angular/forms";
 import { Table } from "primeng/table";
 import { InputInfo } from "../../componentModel/input-info";
 import { TableInfo } from "../../componentModel/table-info";
 import { ActivatedRoute, Router } from "@angular/router";
 
 import * as XLSX from "xlsx";
 import {
   trigger,
   state,
   style,
   transition,
   animate,
 } from "@angular/animations";
 import { saveAs } from "file-saver";
 /**
  * specifies which other files are associated with this component and metadata
  */
 @Component({
   selector: "app-table",
   templateUrl: "./table.component.html",
   styleUrls: ["./table.component.css"],
   animations: [
     trigger("rowExpansionTrigger", [
       state(
         "void",
         style({
           transform: "translateX(-10%)",
           opacity: 0,
         })
       ),
       state(
         "active",
         style({
           transform: "translateX(0)",
           opacity: 1,
         })
       ),
       transition("* <=> *", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
     ]),
   ],
 })
 export class TableComponent implements OnInit, OnChanges {
   /**
    *This input function gets data from our parent class of the type input info
    */
   inputInfo: InputInfo[] = [];
   /**
    *This input function gets data from our parent class of the type input info
    */
   @Input() inputInfo2: InputInfo[] = [];
   /**
    * table data of table info type
    */
   // col = new TableInfo();
   /**
    *This input function gets value change flag from our parent class of the type boolean
    */
   changeFlag = false;
   /**
    * data availability flag
    */
   dataFlag = true;
 
   verFlag = false;
   verFlag2 = [];
   batchFlag = [];
   /**
    * dt viewchild for table filteration global
    */
   @ViewChild("dt") dt: Table | undefined;
   /**
    * name of the excel file to download
    */
   @Input() fileName: string;
   /**
    *table headers from parent
    */
   @Input() tableHeader: any[];
   /**
    *table data from parent
    */
   @Input() tableInfo: TableInfo[];
   /**
    *original data to restore after filtering data
    */
   originalData: TableInfo[];
   /**
    *table data for easy manipulation
    */
   tableData: TableInfo[];
   /**
    *table data for easy manipulation
    */
   tableData2: any[];
   /**
    *action from parent call
    */
   @Input() action: string;
   /**
    * type variable from parent
    */
   @Input() type: string;
   /**
    * fields to search array
    */
   searchFields = [];
   /**
    * searc results array
    */
   searchResult = [];
   /**
    * header flag
    */
   headerName: boolean = false;
   /**
    *delete flag
    */
   deleteFlag = false;
   /**
    *delete flag
    */
   deleteButtonFlag = false;
   /**
    * filter design flag
    */
   designFlag = false;
   showFlag = false;
   managerShowFlag = false;
   /**
    * filter design flag
    */
   designFlag2 = false;
   /** name type flag */
   name: boolean = true;
   /**
    *status for package
    */
   status = ["Allowed", "Not Allowed"];
   /**
    *cloned data variable
    */
   clonedCol: { [s: string]: any } = {};
   /**
    * parent call action perform
    */
   @Output() actionButton = new EventEmitter<TableInfo>();
   /**
    * parent call when data is updated
    */
   @Output() updatedData = new EventEmitter();
   @Output() deleteData = new EventEmitter();
 
   /**
    * parent call on edit data
    */
   @Output() edit = new EventEmitter();
   /**
    * parent call on reporting
    */
   @Output() report = new EventEmitter();
   /**
    * parent call on edit service
    */
   @Output() editService = new EventEmitter();
   @Output() openModal = new EventEmitter<any>();
   /**
    * parent call on edit user
    */
   @Output() editUser = new EventEmitter();
   /**
    * parent call on save button
    */
   @Output() saveButton = new EventEmitter<any>();
   /**
    * parent call to send id
    */
   @Output() receiveId = new EventEmitter<any>();
   @Output() dateRange = new EventEmitter<any>();
   @Output() emitFilterClear = new EventEmitter<any>();
   /**
    * log types
    */
   logTypes: any[] = [
     { name: "Both", value: "both" },
     { name: "IP", value: "ip" },
     { name: "MSISDN", value: "msisdn" },
   ];
   /**
    * selected city variable
    */
   selectedCity: any;
   expenseId: 1;
   managerId;
   /**
    *
    * @param datePipe transform date according to requirement
    */
   constructor(
     private datePipe: DatePipe,
     private router: Router,
     private activatedRoute: ActivatedRoute
   ) {
     if (this.headerName == true) {
       this.name = true;
     }
   }
   /**
    * ngOnInIt is an angular lifecycle function that run when we load our component or application
    */
   ngOnInit(): void {
     if (this.tableHeader) {
       this.search();
     }
     for (let item of this.tableInfo) {
       this.verFlag2.push(false);
     }
   }
   /**
    * generate fields array for global search
    */
   search() {
     this.searchFields = [];
     this.tableHeader.find((data) => {
       let obj = data.field;
       this.searchFields.push(obj);
     });
     this.generateFormData();
   }
   /**
    *
    * @param table clear table data on call
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
    * call on call
    * @param data data for call
    */
   onCall(data) {}
   /**
    * message on call
    */
   onMessage() {}
   /**
    * on edit
    * @param data data to edit
    */
   onEdit(data) {
     this.edit.emit(data.id);
     this.router.navigate(["admin-panel/owner-edit"], {
       queryParams: { userId: data.id },
     });
   }
   onEditClient(data) {
     this.edit.emit(data.id);
   }
   onEditEmployee(data) {
     this.edit.emit(data);
   }
   onPaySalary(data) {
     this.edit.emit(data);
   }
   onExpenseHead(data) {
     this.edit.emit(data.id);
     this.router.navigate(["manager/expenses-details"], {
       queryParams: { id: data.id },
     });
   }
   showDialog(data) {
     this.display = true;
     this.showFlag = true;
     this.expenseId = data.id;
   }
   showModal(data) {
     this.openModal.emit(data);
   }
   onEmployeeView(data) {
     console.log(data);
     this.edit.emit(data.employeeId);
     this.router.navigate(["manager/view-employee"], {
       queryParams: { employeeId: data.employeeId },
     });
   }
   onEditType(data) {
     // console.log(data.id);
     this.edit.emit(data.id);
     this.router.navigate(["admin-panel/edit-business-types"], {
       queryParams: { typeId: data.id },
     });
   }
   viewBatchLog(id) {
     this.router.navigate(["manager/batch-log"], {
       queryParams: { id: id },
     });
   }
   onEditBusiness(data) {
     this.edit.emit(data.id);
     this.router.navigate(["admin-panel/edit-business"], {
       queryParams: { businessId: data.id },
     });
   }
   onChangeStatus(id, status) {
     this.updatedData.emit({ id: id, currentStatus: status });
   }
   onChangePassword(data) {
     this.edit.emit(data.id);
     this.router.navigate(["admin-panel/change-password"], {
       queryParams: { userId: data.id },
     });
   }
   /**
    * on report
    * @param data data to report
    */
   onReport(data) {
     this.report.emit(data);
   }
   /**
    * edit service
    * @param data data of service to edit
    */
   onEditService(data) {
     this.editService.emit(data.id);
   }
   /**
    * edit user
    * @param data data of the user
    */
   onEditUser(data) {
     this.editUser.emit(data.id);
   }
   /**
    *
    * @param row row to edit
    * @param index index of the row
    */
   onRowEditInit(row, index: number) {
     this.clonedCol[row._id] = { ...row };
     setTimeout(() => {
       this.onRowEditDelete(this.clonedCol[row._id], index);
     }, 5000);
   }
   /**
    *
    * @param row row to edit
    * @param index index of the row
    */
   onRowEditInit2(row, index: number) {
     this.clonedCol[row._id] = { ...row };
   }
 
   /**
    *
    * @param row row to be edited
    */
   onRowEditSave(row) {
     delete this.clonedCol[row._id];
     this.saveButton.emit(row);
   }
   /**
    *
    * @param row row to delete
    * @param index index of the row
    */
   onRowEditDelete(row, index: number) {
     this.tableInfo[index] = this.clonedCol[row._id];
     delete this.clonedCol[row._id];
   }
   /**
    * this generates form data
    */
   generateFormData() {
     this.createInput(
       "Start Schedule Date",
       "startScheduleDate",
       "date",
       "calender",
       "dd/mm/yyyy  ",
       "scheduled delivery date",
       [
         {
           type: Validators.required,
           msg: "You must select your schedule start date and time",
         },
       ],
       ""
     );
   }
   /**
    * This functions takes multiple parameters and save them in an object of inputInfo
    *
    * @param label This is the name of the text boxes
    * @param modelName it contains name of the model variable for the data to be stored in
    * @param inputType This tells us the context of the content i.e email, password etc
    * @param type This tells us the type of input i.e text, number, symbols etc
    * @param placeHolder place holder to display in our input
    * @param details data to display around fields
    * @param validatorsInfo This is an object of a model which contains validators type and message
    * @param data info to show in table fields
    */
   createInput(
     label,
     modelName,
     inputType,
     type,
     placeHolder,
     details,
     validatorsInfo,
     data
   ) {
     let inputObj = new InputInfo();
     inputObj.label = label;
     inputObj.modelName = modelName;
     inputObj.inputType = inputType;
     inputObj.type = type;
     inputObj.placeHolder = placeHolder;
     inputObj.details = details;
     inputObj.validatorsInfo = validatorsInfo;
     inputObj.data = data;
     this.inputInfo.push(inputObj);
   }
   /**
    * on delete
    */
   onDelete(row, index: number, flag) {
     //  this.tableInfo[index] = this.clonedCol[row._id];
     //  delete this.clonedCol[index];
     console.log("hey");
     this.deleteFlag = true;
     this.deleteButtonFlag = false;
     this.deleteData.emit(row);
     this.verFlag = !this.verFlag;
   }
   onChangeFlag(index?) {
     this.verFlag2[index] = !this.verFlag2[index];
   }
   onEditTank(data) {
     this.edit.emit(data.id);
   }
   /**
    * on delete
    */
   onDeleteButton() {
     this.deleteButtonFlag = !this.deleteButtonFlag;
   }
   /**
    * emits id
    * @param id id to emit to parent class
    */
   sendId(id) {
     this.receiveId.emit(id);
   }
   /**
    * this clears all active filters
    */
   clearFilter() {
     this.tableInfo = this.originalData;
     // // this.inputInfo2[0].val = "";
     // delete this.inputInfo2[0].value;
     this.designFlag = false;
     this.designFlag2 = false;
   }
   display: boolean = false;
 
   /**
    * purpose of this function is to filter by dates
    * @param date date range set for date filter
    */
   dateFilter(date) {
     console.log(date[0], date[1]);
     if (date[0] && date[1]) {
       this.inputInfo[0].value = date;
       let dateFrom =
         this.datePipe.transform(date[0], "yyyy-MM-dd") + "T00:00:00.000Z";
       let dateTo =
         this.datePipe.transform(date[1], "yyyy-MM-dd") + "T23:59:59.000Z";
 
       this.tableData = this.tableInfo;
       this.tableInfo = [];
       this.tableInfo = this.originalData.filter(
         (x) => x.dateTime >= dateFrom && x.dateTime <= dateTo
       );
     }
     this.designFlag = true;
   }
   emitDateRange(date) {
     console.log(date);
     if (date[0] && date[1]) {
       this.dateRange.emit(date);
       // this.inputInfo[0].value = date;
       // let dateFrom =
       //   this.datePipe.transform(date[0], "yyyy-MM-dd") + "T00:00:00.000Z";
       // let dateTo =
       //   this.datePipe.transform(date[1], "yyyy-MM-dd") + "T23:59:59.000Z";
 
       // this.tableData = this.tableInfo;
       // this.tableInfo = [];
       // this.tableInfo = this.originalData.filter(
       //   (x) => x.dateTime >= dateFrom && x.dateTime <= dateTo
       // );
     }
     this.designFlag = true;
   }
   /**
    * purpose of this function is to filter short codes
    * @param data condition set for shortcode filter
    */
   shortCodeFilter(data) {
     if (!data) {
       this.tableInfo = this.originalData;
       this.inputInfo2[0].val = "";
       delete this.inputInfo2[0].value;
       this.designFlag2 = false;
     } else {
       this.inputInfo2[0].val = data;
       this.inputInfo2[0].value = data;
       this.tableData = this.tableInfo;
       this.tableInfo = [];
       this.tableInfo = this.tableData.filter((x) => x.shortCode == data.name);
       this.designFlag2 = true;
     }
   }
   /**
    * This function checks whether there is any change in the initial value, saves it and validates it.
    * @param changes This is a boolean type flag to check for changes in value.
    */
   ngOnChanges(changes: SimpleChanges) {
     if (this.tableInfo.length > 0 && this.dataFlag == true) {
       this.originalData = this.tableInfo;
       this.dataFlag = false;
     }
   }
   /**
    * this function exports an excel file
    */
   exportexcel(): void {
     /* pass here the table id */
     let element = document.getElementById("excel-table");
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
 
     /* save to file */
     XLSX.writeFile(wb, this.fileName);
   }
   /**
    * this function exports an excel file
    */
   exportExcel() {
     if (this.searchResult && this.searchResult.length > 0) {
       import("xlsx").then((xlsx) => {
         const worksheet = xlsx.utils.json_to_sheet(this.searchResult);
         const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
         const excelBuffer: any = xlsx.write(workbook, {
           bookType: "xlsx",
           type: "array",
         });
         this.saveAsExcelFile(excelBuffer, this.fileName);
       });
     } else {
       import("xlsx").then((xlsx) => {
         const worksheet = xlsx.utils.json_to_sheet(this.tableInfo);
         const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
         const excelBuffer: any = xlsx.write(workbook, {
           bookType: "xlsx",
           type: "array",
         });
         this.saveAsExcelFile(excelBuffer, this.fileName);
       });
     }
   }
   /**
    * this function saves data as an excel file
    * @param buffer buffer of the file
    * @param fileName name of the excel file
    */
   saveAsExcelFile(buffer: any, fileName: string): void {
     import("file-saver").then((FileSaver) => {
       let EXCEL_TYPE =
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
       let EXCEL_EXTENSION = ".xlsx";
       const data: Blob = new Blob([buffer], {
         type: EXCEL_TYPE,
       });
 
       FileSaver.default.saveAs(data, fileName);
     });
   }
   /**
    * searchin gfunction forprinting
    * @param data  value selected
    */
   searchPrint(data) {
     let toSearch = data.target.value.toLowerCase();
     this.tableData2 = this.tableInfo;
     this.searchResult = [];
     this.searchResult = this.tableData2.filter((tableData) => {
       if (JSON.stringify(tableData).toLowerCase().includes(toSearch)) {
         return tableData;
       }
     });
     if (!toSearch) {
       this.clearFilter();
     }
   }
   /**
    * global filter function
    * @param $event data to filter
    * @param stringVal filtered according to this value
    */
   applyFilterGlobal($event, stringVal) {
     this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
   }
   /**
    * function to filter logs type data
    * @param value data is filtered according to this value
    */
   logTypeFilter(value) {
     let type = value.value.value;
     if (type != "both") {
       this.tableInfo = this.originalData.filter((tableData) => {
         return tableData.type == type;
       });
     }
     if (type == "both") {
       this.tableInfo = this.originalData;
     }
     this.designFlag2 = true;
   }
   emitClearFilter() {
     this.designFlag = false;
     this.emitFilterClear.emit();
   }
 }
 