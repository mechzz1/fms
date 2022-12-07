/**
 * This is our side panel component, to be used through out our program
 */
import { style } from "@angular/animations";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/auth/auth.service";
import { SidePanelInfo } from "../../componentModel/sidePnael-info";
/**
 * specifies which other files are associated with this component and metadata
 */
@Component({
  selector: "app-side-panel",
  templateUrl: "./side-panel.component.html",
  styleUrls: ["./side-panel.component.css"],
})
export class SidePanelComponent implements OnInit {
  /**
   * This is the constructor of our component
   * @param router is a router type variable created to use router functions to navigate within our project
   * @param Jarwis is an angular service type variable used to call APIs required for our application
   */
  constructor(public router: Router, private Jarwis: AuthService) {}

  /**
   * show/hide sms plus option on side panel
   */
  smsPlusFlag: boolean = false;
  /**
   * show/hide televoting option on side panel
   */
  televotingFlag: boolean = false;
  /**
   * show/hide sms reporting option on side panel
   */
  smsReportingFlag: boolean = false;
  /**
   * show/hide received sms option on side panel
   */
  othersReceivedMessagesFlag: boolean = false;
  showFlag: boolean = true;
  screenSize: number;
  /**
   *side panel data in this object
   */
  sidePanelInfo = new SidePanelInfo();
  /**
   * This is our life cycle hook that runs when our component loads and it creates an array
   */
  ngOnInit(): void {
    // this.checkUserServices();
  }
  ngAfterViewInit() {
    this.screenSize = window.innerWidth;
    if (this.screenSize <= 1025) {
      this.showFlag = false;
    }
    if (this.screenSize >= 1028) {
      this.showFlag = true;
    }
  }
  /**
   * this function changes the display and style of the side panel
   * @param cond conditions of the sidepanel
   */
  hideShow(cond) {
    // comment might be needed later

    let sms = document.getElementById("sms");
    let smsSelect = document.getElementById("smsSelect");
    // if (cond == "sms") {
    //   if (sms.style.display == "flex") {
    //     sms ? (sms.style.display = "none") : "";
    //   } else {
    //     sms ? (sms.style.display = "flex") : "";
    //     smsPlus ? (smsPlus.style.display = "none") : "";
    //     smsReporting ? (smsReporting.style.display = "none") : "";
    //     televoting ? (televoting.style.display = "none") : "";
    //     recMsg ? (recMsg.style.display = "none") : "";
    //     smsSelect
    //       ? smsSelect.setAttribute("class", "nav-link text-white active")
    //       : "";
    //     recMsgSelect
    //       ? recMsgSelect.setAttribute("class", "nav-link text-white ")
    //       : "";
    //     televotingSelect
    //       ? televotingSelect.setAttribute("class", "nav-link text-white ")
    //       : "";
    //     smsPlusSelect
    //       ? smsPlusSelect.setAttribute("class", "nav-link text-white ")
    //       : "";
    //     smsReportingSelect
    //       ? smsReportingSelect.setAttribute("class", "nav-link text-white ")
    //       : "";
    //   }
    // }
  }

  /**
   * this is our function to navigate in our app according to the user
   * @param name string name of the component to be routed to
   */
  navigate(name) {
    this.router.navigateByUrl("/side-panel/" + name);
  }

  sideBar() {
    if (this.showFlag == true) {
      this.showFlag = false;
    } else if (this.showFlag == false) {
      this.showFlag = true;
    }
  }
  // @ViewChild("drawer") drawer: MatSidenav;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.showFlag = false;
    }
    if (event.target.innerWidth >= 770) {
      this.showFlag = true;
    }
  }
}
