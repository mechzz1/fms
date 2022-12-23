import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  lockFlag = true;
  dateTime : Date;
  checked:boolean = true;
  title = 'Dashboard';
  icon = 'fa fa-home fa-2x';
  userId;
  name;

  constructor(public router: Router,
    private tokenStorage: TokenStorageService,
    private Jarwis: AuthService,
    private messageService: MessageService,) { 
    let url = this.router.url.split("admin/")[1];
    if (url == "dashboard") {
      this.headerNameIcon("Dashboard", "fa fa-home fa-2x");
    }else if(url =="user"){
      this.headerNameIcon('User Registration','fass fa fa-user fa-2x');
    }
    else if(url =="vehicle"){
      this.headerNameIcon('Vehicle Registration','fass fa fa-truck fa-2x');
    }
    else if(url =="vehicle-allocation"){
      this.headerNameIcon('Vehicle Allocation','fass fa fa-truck fa-2x');
    }
    else if(url =="job"){
      this.headerNameIcon('Job','fass fas fa-tasks fa-2x');
    }
    else if(url =="assign-job"){
      this.headerNameIcon('Assign Job','fa fa-tasks');
    }
    }

  ngOnInit(): void {
    timer(0,1000).subscribe(() =>{
      this.dateTime = new Date();

    })
    this.checked = true;
    this.name = this.tokenStorage.getName();
    this.userId = this.tokenStorage.getUserId();
    console.log(this.userId);
    this.getEmployeeData();
  }
  getEmployeeData(){
    this.Jarwis.getOneEmployee(this.userId).subscribe(
      (data) => this.handleData(data, "success"),
      (error) => this.handleError(error)
    );
  }
  handleError(error) {
    let msg = error.error ? error.error : error.message;
    this.addMessages("error", "Error", msg);
  }
  handleData(data, type) {
    if(data.error){
      this.handleError(data);
    }else{
      console.log(data);
      
      // this.addMessages("success", "Success", data.message);
    }
  }
  addMessages(severity, summary, detail) {
    this.messageService.clear();
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

  navigate(name) {
    this.router.navigateByUrl("/manager/" + name);
  }
  navLock(){
    if(this.lockFlag){
      this.lockFlag = false;
    }
    else{
      this.lockFlag = true;
     }
  }
  headerNameIcon(title , icon){
    this.title = title;
    this.icon = icon;
    // console.log(icon);
  }

}
