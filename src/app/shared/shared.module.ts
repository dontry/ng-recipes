import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { HeaderComponent } from "../header/header.component";
import { DropdownDirective } from "./dropdown.directive";
import { WarningComponent } from "../warning/warning.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AlertComponent,
    HeaderComponent,
    DropdownDirective,
    WarningComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    AlertComponent,
    HeaderComponent,
    DropdownDirective,
    WarningComponent,
    LoadingSpinnerComponent,
    CommonModule
  ]
})
export class SharedModule {}
