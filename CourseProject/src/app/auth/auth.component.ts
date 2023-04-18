import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true
  isLoading: boolean = false
  errorMessage: string = null

  constructor(private authService: AuthService,
              private router: Router) {
  }


  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email
    const password = authForm.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = !this.isLoading

    if (this.isLoginMode) {
      //LOGIN
      authObs = this.authService.login(email, password)
    } else {
      //SIGNUP
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(responseData => {
      console.log(responseData)
      this.isLoading = !this.isLoading
      this.router.navigate(['/recipes'])
    }, errorMessage => {
      console.log(errorMessage)
      this.errorMessage = errorMessage
      this.isLoading = !this.isLoading
    })

    authForm.reset()
  }


}
