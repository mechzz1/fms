import { RouterModule } from "@angular/router";
import { CustomMaterialModule } from "./core/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { IconsProviderModule } from "./icons-provider.module";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { LoginComponent } from "./modules/shared/sharedPages/login/login.component";
import { ButtonComponent } from "./component/htmlComponents/button/button.component";
import { TextBoxComponent } from "./component/htmlComponents/text-box/text-box.component";
import { CapitalizationPipe } from "src/Pipes/camelCaseToCapitalization.pipe";
import { SignUpComponent } from "./modules/shared/sharedPages/sign-up/sign-up.component";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LinkButtonComponent } from "./component/htmlComponents/link-button/link-button.component";
import { ResetPasswordComponent } from "./modules/shared/sharedPages/reset-password/reset-password.component";
import { SidePanelComponent } from "./component/htmlComponents/side-panel/side-panel.component";
import { ForgotPasswordComponent } from "./modules/shared/sharedPages/forgot-password/forgot-password.component";
import { MessageService } from "primeng/api";
import { SidenavModule } from "angular-ng-sidenav";
import { DropDownComponent } from "./component/htmlComponents/drop-down/drop-down.component";
import { TextAreaComponent } from "./component/htmlComponents/text-area/text-area.component";
import { MultiSelectComponent } from "./component/htmlComponents/multi-select/multi-select.component";
import { SplitButtonComponent } from "./component/htmlComponents/split-button/split-button.component";
import { SelectButtonComponent } from "./component/htmlComponents/select-button/select-button.component";
import { CheckBoxComponent } from "./component/htmlComponents/check-box/check-box.component";
import { TextIconButtonComponent } from "./component/htmlComponents/text-icon-button/text-icon-button.component";
import { InputTableComponent } from "./component/htmlComponents/input-table/input-table.component";
import { InputChipsSpecialComponent } from "./component/htmlComponents/input-chips-special/input-chips-special.component";
import { TableComponent } from "./component/htmlComponents/table/table.component";
import { RadioButtonComponent } from "./component/htmlComponents/radio-button/radio-button.component";
import { LineChartComponent } from "./component/htmlComponents/line-chart/line-chart.component";
import { DatePipe } from "@angular/common";
import { CalenderComponent } from "./component/htmlComponents/calender/calender.component";
import { DialogComponent } from "./component/htmlComponents/dialog/dialog.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminSidebarComponent } from './component/htmlComponents/admin-sidebar/admin-sidebar.component';
import { UserRegComponent } from './pages/users/user-reg/user-reg.component';
import { MaskInputComponent } from './component/htmlComponents/mask-input/mask-input.component';
import { AddVehicleComponent } from './pages/vehicle/add-vehicle/add-vehicle.component';
import { AssignJobComponent } from './pages/job/assign-job/assign-job.component';
import { ApiService } from 'src/app/auth/api.service';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsInputComponent } from "./component/htmlComponents/google-maps-input/google-maps-input.component";
import { LandingComponent } from './pages/landing/landing.component';
import { AllUsersComponent } from './pages/users/all-users/all-users.component';
import { AllVehicleComponent } from './pages/vehicle/all-vehicle/all-vehicle.component';
import { VehicleAllocationComponent } from './pages/vehicle/vehicle-allocation/vehicle-allocation.component';
import { AssignVehicleComponent } from './pages/vehicle/vehicle-allocation/assign-vehicle/assign-vehicle.component';
import { AllJobsComponent } from './pages/job/all-jobs/all-jobs.component';
import { ConfigService } from 'src/app/auth/app.config.service';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { LocateVehicleComponent } from './pages/vehicle/locate-vehicle/locate-vehicle.component';
import * as io from 'socket.io-client';



registerLocaleData(en);
/**
 * This function sends the request to get token.
 * @returns
 */
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
/**
 *
 */
// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    TextBoxComponent,
    CapitalizationPipe,
    SignUpComponent,
    LinkButtonComponent,
    ResetPasswordComponent,
    SidePanelComponent,
    ForgotPasswordComponent,
    DropDownComponent,
    TextAreaComponent,
    MultiSelectComponent,
    SplitButtonComponent,
    SelectButtonComponent,
    CheckBoxComponent,
    TextIconButtonComponent,
    InputTableComponent,
    InputChipsSpecialComponent,
    TableComponent,
    RadioButtonComponent,
    LineChartComponent,
    CalenderComponent,
    DialogComponent,
    DashboardComponent,
    AdminSidebarComponent,
    UserRegComponent,
    MaskInputComponent,
    AddVehicleComponent,
    AssignJobComponent,
    GoogleMapsInputComponent,
    LandingComponent,
    AllUsersComponent,
    AllVehicleComponent,
    VehicleAllocationComponent,
    AssignVehicleComponent,
    AllJobsComponent,
    EditUserComponent,
    LocateVehicleComponent,

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    SidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:8080"],
        blacklistedRoutes: ["localhost:8080/api/auth/signin"],
      },
    }),
    HttpClientModule,
    AppRoutingModule,
    IconsProviderModule,

    // NgbModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4BJIvP1H1nCyebJ1BnyB19zFveUZXJt4',
      libraries: ['places']
    })
  ],
  providers: [MessageService, DatePipe , ApiService , ConfigService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
