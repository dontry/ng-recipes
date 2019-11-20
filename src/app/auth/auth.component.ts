import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      const { email, password } = form.value;
      authObs = this.authService.signin(email, password);
    } else {
      const { email, password } = form.value;
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    form.reset();
  }
}
