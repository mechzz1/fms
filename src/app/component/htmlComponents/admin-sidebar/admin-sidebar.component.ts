import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

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
  constructor(public router: Router,) { }

  ngOnInit(): void {
    timer(0,1000).subscribe(() =>{
      this.dateTime = new Date();

    })
    this.checked = true;
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
