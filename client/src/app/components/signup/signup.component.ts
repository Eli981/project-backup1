import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterUser } from '../../models/account.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnDestroy {

  subscribed: Subscription | undefined;
  apiErrorMessage: string | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder) {
  }

  ngOnDestroy(): void {

    this.subscribed?.unsubscribe;

  }

  userFg = this.fb.group({ // formGroup
    usernameCtrl: ['', [Validators.minLength(3)]], // formControl
    emailCtrl: ['', [Validators.required, Validators.email]],// ya . pattern mizanim  va az regEx estefade mikonim . 
    passwordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
    confirmPasswordCtrl: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
  });




  get UsernameCtrl(): FormControl {
    return this.userFg.get('usernameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PassswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.userFg.get('confirmPasswordCtrl') as FormControl;
  }



  register(): void {

    let signup: RegisterUser = {

      username: this.UsernameCtrl.value,
      email: this.EmailCtrl.value,
      password: this.PassswordCtrl.value,
      confirmPassword: this.ConfirmPassword.value
    }

    this.accountService.registerUser(signup).subscribe({
      next: signup => console.log(signup),
      error: err => this.apiErrorMessage = err.error
    })
  }
}
