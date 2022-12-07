import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminSidebarComponent } from "./component/htmlComponents/admin-sidebar/admin-sidebar.component";
import { SidePanelComponent } from "./component/htmlComponents/side-panel/side-panel.component";
import { LoginComponent } from "./modules/shared/sharedPages/login/login.component";
import { SignUpComponent } from "./modules/shared/sharedPages/sign-up/sign-up.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AllJobsComponent } from "./pages/job/all-jobs/all-jobs.component";
import { AssignJobComponent } from "./pages/job/assign-job/assign-job.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { AllUsersComponent } from "./pages/users/all-users/all-users.component";
import { UserRegComponent } from "./pages/users/user-reg/user-reg.component";
import { AddVehicleComponent } from "./pages/vehicle/add-vehicle/add-vehicle.component";
import { AllVehicleComponent } from "./pages/vehicle/all-vehicle/all-vehicle.component";
import { VehicleAllocationComponent } from "./pages/vehicle/vehicle-allocation/vehicle-allocation.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "side-panel", component: SidePanelComponent },
  { path: "admin" , component : AdminSidebarComponent,
  children: [
    {
      path: "dashboard",
      component: DashboardComponent,
    },
    {
      path:"user",
      component : AllUsersComponent
    },
    {
      path:"vehicle",
      component : AllVehicleComponent
    },
    {
      path:"vehicle-allocation",
      component : VehicleAllocationComponent
    },
    {
      path:"job",
      component:AllJobsComponent,
    },
    {
      path:"assign-job",
      component:AssignJobComponent,
    }
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
